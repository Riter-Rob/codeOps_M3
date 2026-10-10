# VERIFICATION.md — Testing, Verification & Presentation Walkthrough

This document records the exact steps to verify Addis Eats across the four areas using browser tools, network inspection, security attacks, and the 8-minute presentation walkthrough script.

> **Current status:** Sections 1–4 contain historical demo claims, not a fresh security audit. See [Section 5](#5-code-review-standard-and-process) for the active review process and unresolved production security risks; do not infer that three passing attack scenarios establish general privacy or authentication safety.

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

---

## 5. Code Review Standard and Process

**Scope:** All changes under `day 20/project/AddisEats/` in the `codeOps_M3` monorepo. This is a review policy, not proof that the old verification claims above still hold. Treat historical demo results as hypotheses to recheck against the changed code. Review the diff *and* its call sites; do not use a green build as a substitute for behavioral or security evidence.

### A. Required standards (review every change against applicable items)

| Area | Acceptance criteria / evidence |
|---|---|
| Correctness and clarity | Describe expected behavior and edge cases; keep changes focused; use descriptive names; remove dead code and debug output. Match surrounding JS/TS and React conventions, rather than introducing a competing style. Explain non-obvious decisions, not obvious syntax. |
| Tests and regressions | Add or update automated tests for changed nontrivial behavior where feasible; include negative and boundary cases. There is **no test runner or suite** at present, so document and execute reproducible manual steps until one is adopted; a checklist is not a substitute for test coverage. Record any untested case as a follow-up with an owner. |
| Trust boundaries | Treat URL params, request bodies, form data, cookies, and client-side state as untrusted. Enforce identity, role, record ownership, and validation again in every server action and API handler; never rely on middleware, hidden controls, or user-submitted IDs alone. Do not log secrets or expose customer names, phone numbers, or addresses on public endpoints. |
| Next.js architecture and data | Keep server components by default; justify each new `"use client"` boundary. Check cache policy, private-data isolation, SWR key/seed behavior, polling and debounce against `BOUNDARY.md`, `DATA.md`, and `DECISIONS.md`. Avoid module-global mutable state for production data and unbounded network requests. |
| UX, accessibility and discovery | Check loading/empty/error states, keyboard interaction, labels, focus and readable text. For public pages, check metadata and canonical/OG links; do not include private customer routes in the sitemap. |
| Performance and docs | Check image dimensions/size, client bundle growth and affected Core Web Vitals against `PERF.md` and `DECISIONS.md`. Update `AUTH.md`, `DATA.md`, `BOUNDARY.md`, `VERIFICATION.md`, and related docs when their claims change; never repeat measured scores without rerunning the measurement. |
| Tooling | Run `npm run check` and `npm run build` from this project directory; report pass/fail, warnings and environment restrictions. TypeScript currently has `allowJs: true` but **not** `checkJs`, so a passing type check does not validate most `.js` files. Existing ESLint warnings are not permission to introduce new ones. |

### B. Severity and disposition

- **Blocker (P0):** Exploitable privilege escalation, private-data exposure, secret leakage, or destructive behavior. Stop release; notify the maintainer immediately. No sign-off or waiver until fixed and verified.
- **Must fix (P1):** Incorrect user-visible behavior, missing ownership/role checks, significant regression, failing check/build, missing evidence for a high-risk change, or a new lint warning. Fix before merge, then request re-review.
- **Should fix (P2):** Maintainability, accessibility, test or performance gaps with a bounded impact. Fix before merge unless reviewer and owner agree to a tracked issue with owner and due date; document the exception in the PR.
- **Suggestion (P3):** Optional naming or style preference. Do not block. Use `P0`–`P3` labels in review comments with file/line, why it matters, and a concrete recommendation; ask questions where behavior is unclear. Authors answer each finding with a fix commit or documented rationale. Only the reviewer resolves their own thread.

### C. Pull request workflow (human-enforced until CI and branch rules exist)

1. **Author, before requesting review:** Create a focused branch; explain intent, changed routes/data boundaries, risks, rollback plan, and linked issue. Keep unrelated refactors separate. Run `npm run check` and `npm run build`; record exact outcomes. For UI changes attach before/after screenshots and keyboard/mobile checks; for behavior changes attach reproduction steps and actual results. Update the relevant architecture docs.
2. **Triage and assign:** Assign one independent reviewer for normal PRs; assign **two**, including an owner familiar with security, for auth/session, order/customer data, API authorization, secrets, dependencies, or deployment configuration. Author cannot approve their own PR. Split large diffs or schedule a walkthrough so both reviewers can reason about them.
3. **Reviewer, in order:** Read the intent and risk, trace entry points through data access and mutations, run/check evidence for relevant paths, then check correctness, privacy, tests, accessibility, performance and maintainability. For affected auth/order paths, try signed-out access, customer A versus customer B access, staff-only access, invalid inputs and a forged ID, using demo data only. Give actionable, severity-tagged feedback; state what was actually verified rather than claiming broad coverage.
4. **Iteration and merge:** Author addresses all P0/P1 comments, re-runs affected checks and requests re-review after substantive changes. Merge only after required independent approvals, all blocking threads resolved, `npm run check` and `npm run build` pass (or an explicitly documented environmental blocker is resolved), and evidence is current for the final commit. Use squash merge, retain the PR evidence, and watch the affected routes after deployment. No direct pushes to `main` as a team practice.
5. **Urgent hotfix:** Still require an independent reviewer and focused verification before merge. If normal review cannot happen, do not represent the change as reviewed; coordinate with the maintainer and document the exception, follow-up review and test coverage. Never waive P0 release blockers.
6. **Operating cadence:** Request a first review response by the next business day; if no reviewer is available, the maintainer reassigns the PR rather than self-approving. Each week, review open P0/P1 findings and overdue P2 exceptions; monthly, inspect review turnaround, escaped defects and recurrent findings, then adjust the checklist and test priorities. Do not use comment count or approval speed alone as a quality target.

**PR description template (copy into each Addis Eats PR):**

```md
## What and why
- Issue / goal:
- Scope and affected routes/data:
- Risk and rollback:

## Verification (attach evidence and exact outcome)
- [ ] `npm run check` — result and warnings:
- [ ] `npm run build` — result:
- [ ] Automated tests added/updated, or why not yet feasible:
- [ ] Manual happy-path, error/empty and boundary checks — steps and results:
- [ ] Auth/role/ownership and customer-data checks (if applicable):
- [ ] UI keyboard/mobile/screenshots or performance/SEO checks (if applicable):
- [ ] Architecture/documentation updated, or not applicable:

## Review
- Review risk: normal / high (reason):
- Reviewer(s) and unresolved P0/P1 findings:
- P2 exceptions with linked issue, owner and due date:
```

### D. Adoption and existing risk register

At policy adoption, the repository has no automated test files, installed GitHub PR template, CI workflow, or proven required branch rule for this project. The repo root is `codeOps_M3`, **not** this app directory: a future GitHub workflow or shared PR template must be installed at the *repo-root* `.github/`, scoped to this project's path to avoid affecting other projects. A maintainer must configure protected `main`, required approvals, stale-approval dismissal, required status checks and no direct pushes in the hosting service; this document alone cannot enforce them. Until then, the above steps are manual gates. Add a test runner and make relevant automated security/regression tests mandatory before calling this a complete automated quality gate.

**Initial review findings to track separately; do not claim these are fixed by this policy:**

- **P0 for production:** `app/actions/auth.js` accepts the submitted `role` (including `staff`) and issues a signed session without a trusted identity check; `lib/auth.js` also falls back to a shared signing secret. Demo-only login must not be treated as real authentication. Restrict or remove production access until replaced and independently verified.
- **P0 for production:** `app/api/orders/[id]/route.js` returns the entire demo order #1 before authentication, including customer phone and delivery area; `app/order-status/page.js` can seed an arbitrary matched order into the page before any ownership check. Redact or authorize all customer details before a public release, and verify signed-out/cross-account responses.
- **P2 tooling debt:** Baseline lint currently reports two warnings (`app/kitchen/page.js` unused `statusClass`; `app/layout.tsx` custom-font warning). Type checking passes but does not check most JavaScript. Track and remove the warnings instead of silently ratcheting up the tolerated count.
- **Build verification pending (2026-10-10):** `npm run check` passed with the two existing warnings. Both `npm run build` and `npm run build -- --webpack` stalled after loading `next.config.ts` in the current environment and were stopped; no production build success is claimed. Diagnose before making build a required hosted status check.

Re-run this audit after remediation and update any contradictory claims in `AUTH.md`, `DATA.md`, `README.md`, or the historical sections of this file.
