---
name: "Turnip Bakes"
description: "Storefront and ordering site for a home bakery"
tech: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, Resend, Playwright"
---

## Project Overview

[Turnip Bakes](https://turnipbakes.com) is a home bakery specializing in Korean-style baked goods and custom cakes. Before this site, orders came in through Instagram DMs — which meant every order was a conversation, details got lost in the thread, and there was no single place to point a customer at.

The site is the storefront and the order desk: a menu, a custom cake request flow, a cart for baked goods, and an FAQ that answers the questions that used to eat up DMs. Orders land in the baker's inbox as a formatted email with all the details already collected.

![Buttercream flower bouquet cake](/assets/turnip-bakes-cake.png)


## Features

- **Menu** with carousels for baked goods and cake flavors
- **Cart and checkout** for standard baked goods
- **Custom cake request flow** — size, flavor, design details, and inspiration photo uploads
- **One-week lead time enforced in the date picker**, so impossible pickup dates can't be selected
- **Order emails** — every submission arrives as a formatted email with photos attached
- **How-to-order and FAQ pages** covering lead time, payment, pickup, and rush orders
- **Fully responsive**, with a hand-drawn brand identity and a turnip-cat mascot

![Turnip Bakes mascot](/assets/turnip-bakes-mascot.png)


## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Email | Resend, with nodemailer for local SMTP testing |
| Testing | Playwright — ordering flows, API contract, responsive layout, and live email |
| Hosting | Vercel |


## Technical Details

**Copy lives in `content/`, not in components.** Every page's text, photo paths, menu items, and FAQ entries are typed exports in separate content modules. Swapping a photo or adding a flavor is a one-line change in a data file, which matters because the person updating the menu isn't the person who wrote the components.

**The order API is the trust boundary.** The browser validates attachments for fast feedback, but `/api/order` re-validates everything: attachment count, per-file size, total payload size, MIME type, and filenames stripped of path components and control characters. Client-side checks are a convenience; the endpoint assumes anything can POST to it.

**Lead-time dates are computed in the user's timezone.** The earliest selectable pickup date is deliberately not derived from `toISOString()` — that's UTC, and a customer ordering at 8pm in Austin would be offered a date a day too early. It's calendar-field arithmetic instead, handling month rollover and DST. Because the value depends on the viewer's clock, it's read through `useSyncExternalStore` with an empty server snapshot, so React never reports a hydration mismatch.

**Email is tested for real.** Beyond the standard Playwright suite, there are separate configs that run orders through a local SMTP server and, opt-in, through live Resend — because "the order form submitted successfully" and "the baker received the order" are different claims.

![Dubai chewy cookie](/assets/turnip-bakes-cookie.png)


## Challenges

**Custom orders don't fit a cart.** A cookie has a quantity; a cake has a size, a flavor, a design, a date, and three reference photos. Both had to end up in the same inbox in the same format, which is why the two flows post the same payload shape to one endpoint instead of forking into two email templates.

**Photo uploads without a storage bucket.** Inspiration photos are base64-encoded and attached directly to the order email, which keeps the whole system to one moving part — but it makes size limits a hard requirement rather than a nicety, enforced on both sides.

**A brand, not a template.** The bakery has a real visual identity — hand-drawn lettering, a doily motif, the turnip-cat mascot. Most of the work here was layout: making illustrated assets and photography sit together cleanly at every viewport without the page reading as a stock theme.
