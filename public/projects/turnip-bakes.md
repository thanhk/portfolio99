---
name: "Turnip Bakes"
description: "Storefront and ordering site for a home bakery"
tech: "Next.js 16, React 19, TypeScript, Tailwind CSS 4, Resend, Playwright"
---

## Project Overview

[Turnip Bakes](https://turnipbakes.com) is a home bakery specializing in Asian-style baked goods and custom cakes. Before this site, orders came in through Instagram DMs. This was unorganized, may have intimidated customers from ordering, and also took more work for the baker (my fiancée).

The site is the storefront and the order desk: a menu, a custom cake request flow, a cart for baked goods, and an FAQ that answers the questions that might deter customers from ordering. Orders land in the baker's inbox as a formatted email with all the details already collected, and allow the baker to easily continue the conversation with the customer.

All of the assets and design were done by our friend @yeyuuxue!

![Buttercream flower bouquet cake](/assets/turnip-bakes-cake.png)


## Features

- **Menu** with carousels for baked goods and cake flavors
- **Cart and checkout** for standard baked goods
- **Custom cake request flow** — size, flavor, design details, and inspiration photo uploads
- **Blocked dates in the calendar**, so the baker can block vacations, booked dates, and enforce a 1 week order minimum. Updates via private calendar
- **Order emails** — every submission arrives as a formatted email with photos attached via Resend
- **How-to-order and FAQ pages** covering lead time, payment, pickup, and rush orders
- **Fully responsive**, with a hand-drawn brand identity and a turnip-cat mascot
- **Analytics**, to show when users drop off, and when/where traffic is coming from

![Turnip Bakes mascot](/assets/turnip-bakes-mascot.png)


## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Email | Resend, with nodemailer for local SMTP testing |
| Testing | Playwright — ordering flows, API contract, responsive layout, and live email |
| Hosting | Vercel |
| Analytics | PostHog |


## Technical Details

**Copy lives in `content/`, not in components.** Every page's text, photo paths, menu items, and FAQ entries are typed exports in separate content modules. Swapping a photo or adding a flavor is a one-line change in a data file, which matters because the person updating the menu isn't the person who wrote the components.

**The order API is the trust boundary.** The browser validates attachments for fast feedback, but `/api/order` re-validates everything: attachment count, per-file size, total payload size, MIME type, and filenames stripped of path components and control characters. Client-side checks are a convenience; the endpoint assumes anything can POST to it.

**Lead-time dates are computed in the user's timezone.** The earliest selectable pickup date is deliberately not derived from `toISOString()` — that's UTC, and a customer ordering at 8pm in Austin would be offered a date a day too early. It's calendar-field arithmetic instead, handling month rollover and DST. Because the value depends on the viewer's clock, it's read through `useSyncExternalStore` with an empty server snapshot, so React never reports a hydration mismatch.

**Email is tested for real.** Beyond the standard Playwright suite, there are separate configs that run orders through a local SMTP server and, opt-in, through live Resend — because "the order form submitted successfully" and "the baker received the order" are different claims.

![Dubai chewy cookie](/assets/turnip-bakes-cookie.png)


## Challenges

**Custom orders don't fit a cart.** A cookie has a quantity; a cake has a size, a flavor, a design, a date, and three reference photos. Both had to end up in the same inbox in the same format, which is why the two flows post the same payload shape to one endpoint instead of forking into two email templates.

**Photo uploads without a storage bucket.** Inspiration photos are base64-encoded and attached directly to the order email, which keeps the whole system to one moving part — but it makes size limits a hard requirement rather than a nicety, enforced on both sides.

**Accurate date blocks.** The baker should not need to worry about orders during vacation or if a date is getting overbooked with orders. A workflow was implemented to sync a personal calendar with the booking dates to make date blocking seamless.

**User experience is valuable.** Adding analytics to the page flow allows us to see if information is missing or a page is not intuitively designed. For example, we already diagnosed that the website did not have enough accessible links to the ordering screens. We went back and updated the design so that users would always be able quickly order items from any screen.
