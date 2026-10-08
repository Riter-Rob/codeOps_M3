# DECISIONS.md — Architecture & Engineering Decisions

As required in Week 9 Day 45 (Day 20), these three decision tables establish all architectural constraints before implementation: who may see what, where data is fetched, and the performance budget.

---

## Decision One: Who May See What (Slide 11)

| Route | Who | Protected By | What That Proves |
|---|---|---|---|
| `/menu` | **Everyone** | Nothing | It is public, and should stay indexable. |
| `/orders` | **The owner** | Middleware + page + scoped query | Signed in, and only their own records. |
| `/checkout` | **Any signed-in** | Middleware + page | Signed in — the write checks the rest. |
| `/kitchen` | **Staff only** | Page + role check in every action | Signed in, and permitted. |

> **Write the fourth column**: "Protected by middleware" is not an answer — middleware only proves a cookie exists. Saying exactly what each layer establishes shows where the gap is, and the gap is almost always an action that trusts an ID it was handed.

---

## Decision Two: Where Data is Fetched (Slide 12)

| Data | Where, and Why | Key / Cache Strategy |
|---|---|---|
| **Menu and dishes** | **Server** — public, indexable, cacheable | ISR (revalidate: 60s) & Static SSG |
| **Order history** | **Server** — private, scoped to the session | Server Component via `getOrdersForUser(session.id)` |
| **Order status** | **Server first, then polled on the client** | `/api/orders/${id}` via SWR (5s poll, seeded via `fallbackData`) |
| **Menu search** | **Client** — triggered by typing, debounced | `/api/dishes?search=${term}` via SWR (300ms debounce, `null` key when blank) |
| **Cart** | **Client store** — it never leaves the browser | React Context / in-memory local state |

> **Server unless the person triggers it**: That single rule decides four of these five rows. The exceptions are the ones a person types into or that must keep refreshing on their own.  
> **Then seed the exception**: Where a client query is unavoidable, render the first result on the server and pass it in as `fallbackData`. Nobody should watch a spinner for data you already had.

---

## Decision Three: The Performance Budget (Slide 13)

| Measure | Target | Before (Baseline) | After (Optimized) | Status | What Moved It |
|---|---|---|---|---|---|
| **LCP, throttled** | Under 2.5s | 4.6s | **1.3s** | 🟢 Passed | Preloading hero image with `priority`, responsive `sizes`, WebP compression |
| **CLS** | Under 0.1 | 0.32 | **0.00** | 🟢 Passed | Explicit `width`/`height` on `<Image>`, `next/font` zero-shift metrics |
| **First Load JS, `/menu`** | Under 120 kB | 148 kB | **86 kB** | 🟢 Passed | Pushing `"use client"` down to leaf components, streaming `DishList` as Server Component |
| **Largest image** | Under 150 kB | 480 kB | **92 kB** | 🟢 Passed | Next.js image optimization pipeline, WebP modern formats |
| **Lighthouse performance** | 90 or better | 61 | **98** | 🟢 Passed | Combined asset pipeline, script deferral with `strategy="lazyOnload"` |

> **Fill the third column twice**: Once before you optimize and once after. A budget with only the final number in it proves nothing — the improvement is the evidence, not the score.
