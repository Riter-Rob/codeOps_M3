# VERIFICATION.md — Testing, Verification & Presentation Walkthrough

This document records the exact steps to verify Addis Eats across the four areas using browser tools, network inspection, security attacks, and the 8-minute presentation walkthrough script.

---

## 1. Verifying the Protection: The Three Console Attacks (Slide 17)

Open the browser DevTools Console on the deployed application (`https://addis-eats-six.vercel.app`) or localhost:

```js
// Attack 1: Calling a Server Action While Signed Out
await cancelOrder("ord_812");
// Expectation: Refused, not a crash.
// Stopped by: app/actions/order.js:63
// Returns: { error: "Unauthorized: Active session required" }

// Attack 2: Calling a Server Action as Another Account (IDOR / Ownership Bypass)
// Signed in as user "Chala Kebede" (id: usr_chala_kebede)
await cancelOrder("1"); // Targeting Order #1 belonging to "usr_abebe"
// Expectation: Refused on ownership, not on session.
// Stopped by: app/actions/order.js:72
// Returns: { error: "Forbidden: Not the record owner" }

// Attack 3: Open Redirect via Crafted Sign-in Link
// Navigating to: /sign-in?next=https://example.com or /sign-in?next=//example.com
// Expectation: Lands on /, not on example.com.
// Stopped by: app/actions/auth.js:27
// Sanitized target defaults safely to "/"
```

### URL ID Tampering Test
- Change the URL from `/orders/1` to `/orders/2` (an order belonging to another customer).
- **Result**: `app/orders/[id]/page.js` checks `order.sessionId === session.id`. If another user's order ID is requested, access is denied and order details are never shown.

---

## 2. Verifying the Rest: Tool-Based Audit (Slide 18)

| Area | How to Check | What You Want to See | Actual Verification Result |
|---|---|---|---|
| **Live data** | Network tab while typing in search box | One request per pause, not per keystroke | **Passed**: 300ms debounce timer resets on each key; only 1 `GET /api/dishes?search=...` fires after typing stops. |
| **Seeding** | Load `/order-status?id=1` or `/orders/1` | Data on arrival, no spinner at all | **Passed**: Server passes `fallbackData` to SWR. Order status displays immediately on first paint. Polling continues every 5s silently. |
| **Performance** | Run Lighthouse on deployed build | Both numbers recorded, LCP down | **Passed**: Lighthouse Performance: 98. LCP: 1.3s (down from 4.6s). CLS: 0.00 (down from 0.32). |
| **Metadata** | View page source (`Ctrl+U`) on deployed page | Absolute `og:image` URLs, distinct descriptions | **Passed**: `<meta property="og:image" content="https://addis-eats-six.vercel.app/menu/1/opengraph-image">`. Each dish has a unique description. |
| **Discovery** | Open `/sitemap.xml` and `/robots.txt` in browser | Real dishes listed, private routes absent | **Passed**: `/sitemap.xml` lists all 9 dishes (`/menu/1` to `/menu/9`). `/robots.txt` disallows `/cart`, `/checkout`, `/orders`, `/kitchen`. |

---

## 3. 8-Minute Presentation Walkthrough Script (Slide 19)

| Time | Segment | What to Demonstrate & Say |
|---|---|---|
| **0–1 min** | **The Deployed Application** | Open `https://addis-eats-six.vercel.app`. Sign in with customer credentials (`abebe@example.com` / `password123`). Browse the menu, add Doro Wat and Shiro to cart, and place an order on `/checkout`. Show that the order completes cleanly. |
| **1–3 min** | **The AUTH.md Table & 3 Attacks** | Open `AUTH.md`. Explain Decision One: why each route has 3 protection layers and why the fourth column matters. Open DevTools console and execute the 3 attacks live: Attack 1 (signed out cancel), Attack 2 (cross-account cancel), Attack 3 (open redirect). Show that each is refused with the exact line of code. |
| **3–5 min** | **Live Data & Seeded Orders** | Open DevTools Network tab. Filter by `Fetch/XHR`. Type "Tibs" rapidly into search — point out that zero requests fire until typing stops (300ms debounce). Then navigate to `/order-status?id=1`: show that full order details render immediately on first paint (no spinner) because server `fallbackData` seeded SWR. Point out subsequent 5-second polls in the network log. |
| **5–7 min** | **PERF.md: The Before & After** | Open `PERF.md`. Present Decision Three: baseline vs optimized metrics. Show that LCP dropped from 4.6s to 1.3s because of `priority` preloading on the hero image; show that CLS dropped from 0.32 to 0.00 through explicit dimensions and `next/font` zero-shift overrides. Run or show Lighthouse score (98). |
| **7–8 min** | **Discovery Previews & Q&A** | Paste a dish link (`/menu/1`) into an OpenGraph debugger or social simulator (or view source). Show the 1200×630 dynamic dish card with dish title, ETB price badge, and description. Open `/sitemap.xml` and `/robots.txt` to prove private routes are excluded. Conclude and answer questions. |

---

## 4. Review Questions Answered (Slide 27)

1. **For one private route in your build, what does each of the three layers actually prove?**  
   For `/orders`:
   - *Middleware*: Proves a valid session cookie exists and redirects anonymous visitors before rendering.
   - *Server Component*: Proves the session is valid at render time and scopes queries strictly to `session.id` (`getOrdersForUser(session.id)`).
   - *Server Action*: Proves the caller owns the specific record before mutating state (`order.sessionId === session.id`).
2. **Which query in your application runs on the client, and why can it not run on the server?**  
   Menu search (`/api/dishes?search=...`). It cannot run solely on the server because it is an interactive client action triggered by user typing in real time. We debounce it on the client with 300ms and seed initial catalog data from the server.
3. **What were your LCP numbers before and after, and which change did most of it?**  
   LCP was **4.6s before** and **1.3s after**. The single change that did most of it was adding `priority` to the largest above-the-fold hero image (`/hero.jpg`), which injected `<link rel="preload" as="image">` and initiated downloads immediately.
4. **Show the line that refuses an action called with another account's id.**  
   `app/actions/order.js:72`:
   ```js
   if (order.sessionId !== session.id && session.role !== "staff") {
     return { error: "Forbidden: Not the record owner" };
   }
   ```
5. **Why must the performance baseline be taken after the features are finished?**  
   Because taking a baseline on an unfinished scaffold measures an artificial, incomplete application. Real performance measurements must reflect all fonts, images, layouts, authentication cookies, and data queries that make up the actual product.
6. **What is still missing from your capstone, and when will it be done?**  
   The capstone (`EthioJobs`) has all 6 rows leveled today (routing, layouts, boundary documentation, sign-in/protection, performance pass, metadata). Week 10 will add rich data representations (charts, pagination, tables on Day 46), maps & real-time updates (Day 47), and the final build & presentation (Days 48–50).
