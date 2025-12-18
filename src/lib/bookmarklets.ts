// IG Follow Checker v1.2 – Last updated 2025-12-17
export const igFollowCheckerSource = String.raw`
javascript:(async function () {
  const QUERY_HASH_FOLLOWERS = "c76146de99bb02f6415203be841dd25a";
  const QUERY_HASH_FOLLOWING = "d04b0a864b4b54837c0d870b0e77e076";
  const PAGE_SIZE = 50;
  const LS_KEY = "ig_followcheck_last_username";

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function pickUsernameFromProfileUrl() {
    const m = location.pathname.match(/^\/([A-Za-z0-9._]+)\/$/);
    return m ? m[1] : "";
  }

  function getCachedUsername() {
    try { return localStorage.getItem(LS_KEY) || ""; }
    catch { return ""; }
  }
  function setCachedUsername(u) {
    try { localStorage.setItem(LS_KEY, u); } catch {}
  }

  async function resolveUsername(opts) {
    opts = opts || {};
    const forcePrompt = !!opts.forcePrompt;

    const fromPage = pickUsernameFromProfileUrl();
    const cached = getCachedUsername();

    if (!forcePrompt) {
      if (fromPage) { setCachedUsername(fromPage); return fromPage; }
      if (cached) return cached;
    }

    const suggested = fromPage || cached || "";
    const entered = (prompt("Instagram username to check:", suggested) || "").trim();
    if (!entered) throw new Error("No username provided.");
    setCachedUsername(entered);
    return entered;
  }

  async function fetchJson(url) {
    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error("HTTP " + res.status + "\n" + text.slice(0, 200));
    }
    return res.json();
  }

  async function getUserId(username) {
    const url =
      "https://www.instagram.com/web/search/topsearch/?query=" +
      encodeURIComponent(username);
    const json = await fetchJson(url);
    const first = json && json.users && json.users[0] && json.users[0].user;
    if (!first || !first.pk) {
      throw new Error('Could not find userId for "' + username + '".');
    }
    return first.pk;
  }

  async function fetchAllEdges(opts) {
    let after = null;
    let hasNext = true;
    const results = [];

    while (hasNext) {
      const variables = {
        id: opts.userId,
        include_reel: true,
        fetch_mutual: true,
        first: PAGE_SIZE,
        after: after,
      };

      const url =
        "https://www.instagram.com/graphql/query/?query_hash=" +
        opts.queryHash +
        "&variables=" +
        encodeURIComponent(JSON.stringify(variables));

      const json = await fetchJson(url);

      let edge = json && json.data && json.data.user;
      for (let i = 0; i < opts.edgePath.length; i++) edge = edge && edge[opts.edgePath[i]];

      if (!edge || !edge.edges || !edge.page_info) {
        throw new Error("Unexpected API response (possibly rate limited).");
      }

      for (let i = 0; i < edge.edges.length; i++) {
        const node = edge.edges[i].node;
        results.push({ username: node.username, full_name: node.full_name });
      }

      hasNext = !!edge.page_info.has_next_page;
      after = edge.page_info.end_cursor || null;

      if (opts.onProgress) opts.onProgress(results.length, hasNext);
      await sleep(150);
    }

    return results;
  }

  function uniqueByUsername(list) {
    const seen = new Set();
    const out = [];
    for (let i = 0; i < list.length; i++) {
      const u = list[i].username;
      if (!seen.has(u)) { seen.add(u); out.push(list[i]); }
    }
    return out;
  }

  function diffByUsername(a, b) {
    const bSet = new Set(b.map((x) => x.username));
    return a.filter((x) => !bSet.has(x.username));
  }

  function toCSV(rows) {
    const esc = (s) => '"' + String(s || "").replaceAll('"', '""') + '"';
    const lines = [ ["username", "full_name"].map(esc).join(",") ];
    for (let i = 0; i < rows.length; i++) {
      lines.push([rows[i].username, rows[i].full_name].map(esc).join(","));
    }
    return lines.join("\n");
  }

  function downloadText(filename, text, mime) {
    const blob = new Blob([text], { type: mime || "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function createModal() {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999999;" +
      "display:flex;align-items:center;justify-content:center;font-family:system-ui;";

    const box = document.createElement("div");
    box.style.cssText =
      "width:min(900px,92vw);height:min(720px,88vh);background:#111;color:#eee;" +
      "border-radius:12px;display:flex;flex-direction:column;overflow:hidden;border:1px solid #222;";

    const header = document.createElement("div");
    header.style.cssText =
      "padding:12px 14px;display:flex;gap:10px;align-items:center;" +
      "border-bottom:1px solid #222;background:#0c0c0c;";

    const title = document.createElement("strong");
    title.textContent = "IG Follow Checker";

    const status = document.createElement("span");
    status.style.cssText = "opacity:.8;font-size:13px;";

    const close = document.createElement("button");
    close.textContent = "✕";
    close.style.cssText =
      "margin-left:auto;background:#222;color:#eee;border:1px solid #333;border-radius:8px;" +
      "padding:6px 10px;cursor:pointer;";
    close.onclick = () => overlay.remove();

    header.append(title, status, close);

    const tabs = document.createElement("div");
    tabs.style.cssText =
      "display:flex;gap:8px;padding:10px 12px;border-bottom:1px solid #222;background:#0c0c0c;flex-wrap:wrap;";

    const list = document.createElement("pre");
    list.style.cssText =
      "flex:1;margin:0;padding:12px;overflow:auto;white-space:pre-wrap;word-break:break-word;background:#111;";

    const actions = document.createElement("div");
    actions.style.cssText =
      "padding:10px 12px;border-top:1px solid #222;background:#0c0c0c;display:flex;gap:8px;flex-wrap:wrap;";

    box.append(header, tabs, list, actions);
    overlay.append(box);
    document.body.append(overlay);

    return { overlay, status, tabs, list, actions };
  }

  const ui = createModal();

  function makeBtn(label, onClick, pill) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = onClick;
    b.style.cssText = pill
      ? "background:#1a1a1a;color:#eee;border:1px solid #333;border-radius:999px;padding:6px 10px;cursor:pointer;font-size:13px;"
      : "background:#222;color:#eee;border:1px solid #333;border-radius:10px;padding:8px 10px;cursor:pointer;font-size:13px;";
    return b;
  }

  function renderTab(name, rows, run) {
    ui.list.textContent =
      name + " (" + rows.length + ")\n\n" +
      rows.map((r) => "@" + r.username + (r.full_name ? " — " + r.full_name : "")).join("\n");

    ui.actions.innerHTML = "";
    ui.actions.appendChild(makeBtn("Copy JSON", () => navigator.clipboard.writeText(JSON.stringify(rows, null, 2))));
    ui.actions.appendChild(makeBtn("Copy @usernames", () => navigator.clipboard.writeText(rows.map((r) => "@" + r.username).join("\n"))));
    ui.actions.appendChild(makeBtn("Download CSV", () => downloadText(name + ".csv", toCSV(rows), "text/csv")));
    ui.actions.appendChild(makeBtn("Run again", () => run()));
    ui.actions.appendChild(makeBtn("Change user", () => run({ forcePrompt: true })));
  }

  function setTabs(tabDefs) {
    ui.tabs.innerHTML = "";
    for (let i = 0; i < tabDefs.length; i++) {
      ui.tabs.appendChild(makeBtn(tabDefs[i].label, tabDefs[i].onClick, true));
    }
  }

  async function run(opts) {
    try {
      ui.status.textContent = "Resolving username…";
      const username = await resolveUsername(opts);

      ui.status.textContent = "Finding userId for @" + username + "…";
      const userId = await getUserId(username);

      ui.status.textContent = "Fetching followers…";
      const followersRaw = await fetchAllEdges({
        userId: userId,
        queryHash: QUERY_HASH_FOLLOWERS,
        edgePath: ["edge_followed_by"],
        onProgress: (count, hasNext) => {
          ui.status.textContent = "Followers: " + count + (hasNext ? " (loading…)" : "");
        },
      });

      ui.status.textContent = "Fetching following…";
      const followingsRaw = await fetchAllEdges({
        userId: userId,
        queryHash: QUERY_HASH_FOLLOWING,
        edgePath: ["edge_follow"],
        onProgress: (count, hasNext) => {
          ui.status.textContent = "Following: " + count + (hasNext ? " (loading…)" : "");
        },
      });

      const followers = uniqueByUsername(followersRaw);
      const followings = uniqueByUsername(followingsRaw);

      const dontFollowMeBack = diffByUsername(followings, followers);
      const iDontFollowBack = diffByUsername(followers, followings);

      window.igFollowCheck = {
        username, userId, followers, followings, dontFollowMeBack, iDontFollowBack
      };

      ui.status.textContent = "Done for @" + username + ". (window.igFollowCheck)";

      setTabs([
        { label: "Don't follow me back (" + dontFollowMeBack.length + ")", onClick: () => renderTab("dontFollowMeBack", dontFollowMeBack, run) },
        { label: "I don't follow back (" + iDontFollowBack.length + ")", onClick: () => renderTab("iDontFollowBack", iDontFollowBack, run) },
        { label: "Followers (" + followers.length + ")", onClick: () => renderTab("followers", followers, run) },
        { label: "Following (" + followings.length + ")", onClick: () => renderTab("followings", followings, run) },
      ]);

      renderTab("dontFollowMeBack", dontFollowMeBack, run);
    } catch (err) {
      ui.status.textContent = "Error";
      ui.list.textContent = (err && err.stack) ? err.stack : String(err);
      ui.actions.innerHTML = "";
      ui.actions.appendChild(makeBtn("Try again", () => run()));
      ui.actions.appendChild(makeBtn("Change user", () => run({ forcePrompt: true })));
    }
  }

  run();
})();
`;


export function makeBookmarklet(code: string) {
    // Remove leading javascript:
    let s = code.replace(/^javascript:\s*/i, "");
  
    // Remove /* ... */ comments safely
    s = s.replace(/\/\*[\s\S]*?\*\//g, "");
  
    // Remove // comments only when they're actual comments (start of line or preceded by whitespace)
    s = s.replace(/(^|\s)\/\/.*$/gm, "$1");
  
    // Collapse whitespace
    s = s.replace(/\s+/g, " ").trim();
  
    return `javascript:${s}`;
  }
  
  
  