---
name: "Mise"
description: "AI planning co-pilot for makers who sell at farmers markets and pop-ups"
tech: "React Native (Expo), TypeScript, Supabase, Anthropic API"
---

## Project Overview

*"Mise en place" — everything in its place.*

Mise is an iOS app for home bakers and makers who sell at farmers markets, pop-ups, and private events. You describe an upcoming event out loud — "Cedar Park farmers market next Saturday, maybe 300 people, four other food vendors" — and the app produces a full plan: what to make, how many batches, what each item should cost, and what to charge for it.

The problem it solves isn't baking, it's the math. Solo makers are running a small business in their spare time: ingredient costs, labor hours, batch yields, and pricing all have to line up, and almost nobody does that arithmetic honestly. Mise does it in the background and shows its work.

Every number the AI produces is editable. After the event, you log what actually sold, and that data feeds the next plan.


## Features

- **Voice or text event planning** — describe an event naturally, get a batch-by-batch plan back
- **Recipe library** with AI-estimated batch cost, yield, and bake time; each estimate is marked as an estimate until you confirm it
- **Pricing that accounts for labor** — unit price suggestions built from ingredient cost plus your own hourly rate, not guesswork
- **Prep view** — the plan collapsed into an ordered bake-day checklist
- **Post-event debrief** — log what sold, what didn't, and what you actually made
- **Insights** — margins and sell-through across events, so the next plan starts from real numbers
- **Offline-first** — everything is cached locally, so the app works in a market field with no signal


## Tech Stack

| Layer | Choice |
|---|---|
| App | Expo (React Native) + TypeScript, Expo Router for file-based navigation |
| Local storage | expo-sqlite — the app reads from local cache first, syncs after |
| Backend | Supabase (auth + Postgres) |
| AI | Anthropic API (Claude), called through a Supabase Edge Function |
| Voice | expo-speech / expo-av for voice capture |
| Distribution | EAS Build → TestFlight, with EAS Update for over-the-air JS releases |

No UI component library — every screen is built from custom components against a fixed design language (espresso, copper, and warm cream; Playfair Display over DM Sans).


## Architecture Notes

**The API key never touches the device.** The Anthropic call lives in a Supabase Edge Function. The app sends structured event context and gets structured JSON back, which means the key stays server-side and the prompt can be changed without shipping a new build.

**Local-first, sync second.** SQLite is the source of truth for a session. A baker standing at a market stall with one bar of signal still gets their prep list instantly.

**OTA-first release process.** The app checks for updates on launch, so copy fixes, prompt changes, and UI tweaks ship in minutes over the `preview` and `production` channels. Only native changes — new native modules, permission changes, version bumps — require a real build and a TestFlight submission.


## Challenges

**Getting structured output from a language model, reliably.** A plan isn't prose — it's a typed array of line items with costs, batch counts, and prices that have to add up. The fix was constraining the model to a strict JSON schema and validating on the way in, treating any malformed response as a retry rather than something the UI has to render.

**Estimates that don't feel like magic.** An AI-generated batch cost is useless if the baker doesn't trust it. Every AI-produced number carries an `aiEstimated` flag and a one-line rationale, and stays visibly provisional until the user confirms it.

**Voice input on a real event description.** People don't describe events in fields. "Next Saturday, the one at Cedar Park, probably a few hundred people" has to become a date, a venue, and an attendee estimate — with the app asking for the parts it couldn't infer instead of silently guessing.

**Designing for a non-technical user.** The target user is a baker, not an app person. That ruled out settings-heavy configuration and pushed toward a single conversational entry point with sensible defaults behind it.


## Status

In private beta on TestFlight, with a waitlist open for new testers.
