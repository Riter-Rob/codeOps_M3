# Addis Eats — Next.js Advanced Full-Stack Application

**IBT College Canada · CodeOps · Full Stack Software Development**  
**Module 3 · Frontend: React & Next.js · Day 45 (Day 20) Advanced Project**  
**Deployed URL**: [https://addis-eats-six.vercel.app](https://addis-eats-six.vercel.app)

---

## 1. Project Overview & Deliverable

Addis Eats brings together the four core disciplines of Week 9 into a single, cohesive, production-grade application:
1. **Accounts & Three-Layer Protection**: Session cookies (`httpOnly`), edge middleware, server component authorization, and ownership-gated server actions.
2. **Live Data & Client State**: 5-second polling for active order status with server-seeded `fallbackData`, and 300ms debounced menu search with null-key skipping.
3. **Measured Performance Overhaul**: Core Web Vitals audited on throttled mobile connections; LCP cut from 4.6s to 1.3s, zero layout shift (CLS 0.00), and Lighthouse score of 98.
4. **Metadata & Discoverability**: Root `metadataBase` on the deployed production domain, dynamic `generateMetadata` for dish records, 1200×630 OpenGraph cards, Schema.org `MenuItem` JSON-LD in ETB, and automated sitemap/robots generation.

---

## 2. Six Areas of Requirement

| Area | Requirement | Implementation | Evidence & Verification |
|---|---|---|---|
| **Accounts** | Sign in, sign out, session in flagged cookie | `app/actions/auth.js`, `lib/auth.js` | Cookie set with `httpOnly: true, secure: true, sameSite: "lax"`. Stored server-side session. |
| **Protection** | Middleware, page check, check in every action | `middleware.js`, `app/orders/page.js`, `app/actions/order.js` | Three attacks all fail; unauthenticated or cross-account mutations refused. |
| **Ownership** | Every query scoped to session, never a sent ID | `app/orders/page.js`, `app/api/orders/[id]` | `getOrdersForUser(session.id)`; URL ID tampering blocked. |
| **Live Data** | One polled query and one debounced search | `app/orders/OrderStatus.js`, `app/menu/DishSearch.js` | SWR 5s poll seeded with `fallbackData`; 300ms debounce fires 1 request per pause. |
| **Performance** | Measured improvement, documented | `next/image` (`priority`, `sizes`), `next/font`, `next/script` | Throttled Mobile Lighthouse score jumped from 61 to 98; LCP 1.3s, CLS 0.00. |
| **Discovery** | Metadata, previews, sitemap, structured data | `app/layout.tsx`, `app/sitemap.js`, `app/robots.js` | Deployed source shows absolute `og:image`, sitemap lists 9 dishes, `MenuItem` JSON-LD. |

---

## 3. The Three Decision Tables

Before building, the three core architectural decisions were codified:
1. **[DECISIONS.md](DECISIONS.md#decision-one-who-may-see-what-slide-11) / [AUTH.md](AUTH.md)**: Who may see each route, what each layer proves, and why the fourth column matters.
2. **[DECISIONS.md](DECISIONS.md#decision-two-where-data-is-fetched-slide-12) / [DATA.md](DATA.md)**: Where data is fetched — server unless triggered by typing, seeded with `fallbackData`.
3. **[DECISIONS.md](DECISIONS.md#decision-three-the-performance-budget-slide-13) / [PERF.md](PERF.md)**: Performance budget with both before and after columns filled out.

---

## 4. How to Run from a Fresh Clone

```bash
# 1. Clone repository and navigate to Day 20 project
git clone https://github.com/Riter-Rob/codeOps_M3.git
cd "codeOps_M3/day 20/mini project/AddisEats"

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local

# 4. Run local development server
npm run dev

# 5. Build and test production bundle
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Security Attack Verification (DevTools Console)

Run these three attacks directly from the browser DevTools Console to verify three-layer protection:

```javascript
// Attack 1: Calling action while signed out
await cancelOrder("ord_812");
// Result: Refused with { error: "Unauthorized: Active session required" } (app/actions/order.js:63)

// Attack 2: Cross-account action invocation (IDOR)
// Logged in as "Chala Kebede" targeting order of "Abebe Bikila":
await cancelOrder("1");
// Result: Refused with { error: "Forbidden: Not the record owner" } (app/actions/order.js:72)

// Attack 3: Open redirect attack via crafted link
// Visit: /sign-in?next=https://example.com
// Result: Redirect safely falls back to "/" (app/actions/auth.js:27)
```

Full details and logs are recorded in [VERIFICATION.md](VERIFICATION.md).

---

## 6. Project Documentation Index

- **[AUTH.md](AUTH.md)**: Route protection matrix, layer proofs, and line-by-line attack defense.
- **[DATA.md](DATA.md)**: Query inventory, caching strategies, debouncing, and SWR fallback hydration.
- **[PERF.md](PERF.md)**: Core Web Vitals before & after audit, asset pipeline analysis, and Lighthouse report.
- **[DECISIONS.md](DECISIONS.md)**: The three pre-build architectural decision tables.
- **[VERIFICATION.md](VERIFICATION.md)**: Tool-based verification checklist, 8-minute presentation walkthrough, and review questions.
- **[FINDABLE.md](FINDABLE.md)** / **[SEO.md](SEO.md)**: Metadata, OpenGraph cards, sitemap, robots, and JSON-LD structured data.