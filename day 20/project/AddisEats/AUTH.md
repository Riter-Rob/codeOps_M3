# AUTH.md — Authentication, Authorization & Three-Layer Security

This document details the authentication model, route guards, ownership verification, and security testing against Addis Eats.

> **Review correction (current code):** The checks below are historical demo tests, not proof of production-safe authentication. `app/actions/auth.js` trusts a self-selected `staff` role and `lib/auth.js` has a fallback signing secret. Public order-status paths can expose customer details. See the [current review risk register](VERIFICATION.md#d-adoption-and-existing-risk-register) before relying on these claims.

---

## 1. Decision One: Who May See What

| Route | Who | Protected By | What That Proves |
|---|---|---|---|
| `/menu` | **Everyone** | Nothing | It is public, and should stay indexable. |
| `/orders` | **The owner** | Middleware + page + scoped query | Signed in, and only their own records. |
| `/checkout` | **Any signed-in** | Middleware + page | Signed in — the write checks the rest. |
| `/kitchen` | **Staff only** | Page + role check in every action | Signed in, and permitted. |

> **Why the fourth column matters**: "Protected by middleware" is never a sufficient answer. Middleware only proves that a cookie exists. Documenting precisely what each layer establishes shows where vulnerabilities lie — which is almost always a server action that blindly trusts an ID it was handed.

---

## 2. The Three Layers of Protection

1. **Layer 1: Edge / Request Middleware (`middleware.js`)**
   - Intercepts requests before route execution.
   - Verifies session cookie existence and validity.
   - Redirects unauthenticated visitors to `/sign-in?next=<destination>` while preserving destination safely.
   - Narrow matcher: runs only on protected routes (`/checkout`, `/orders`, `/orders/:path*`), bypassing public pages and static assets.

2. **Layer 2: Server Component Guard (`app/orders/page.js`, `app/checkout/page.js`, `app/kitchen/page.js`)**
   - Re-verifies `await getSession()` inside the React Server Component render cycle.
   - Guarantees protection even if middleware is misconfigured or bypassed in custom environments.
   - Scopes data queries strictly to `session.id` (`getOrdersForUser(session.id)`).
   - Enforces role requirements on staff-only routes (`session.role === "staff"`).

3. **Layer 3: Server Action & Mutation Gate (`app/actions/order.js`)**
   - Server Actions are standalone POST endpoints callable directly without visiting the UI.
   - Every action (`placeOrder`, `cancelOrder`) re-reads and validates the session cookie.
   - Validates that the caller owns the targeted record before modifying state.
   - Rejects unauthenticated calls with 401 Unauthorized and cross-account attacks with 403 Forbidden.

---

## 3. The Three Attacks Against Addis Eats

### Attack 1: Calling a Server Action While Signed Out
- **Browser Console Command**:
  ```js
  await cancelOrder("ord_812");
  // Expectation: Refused, not a crash.
  ```
- **Line That Stopped It**:
  - `app/actions/order.js`, Line 63:
    ```js
    if (!session) {
      return { error: "Unauthorized: Active session required" };
    }
    ```
- **Observed Result**: The action executed on the server, detected no valid session cookie via `getSession()`, and returned `{ error: "Unauthorized: Active session required" }`. No records were updated and the server did not throw an unhandled exception.

### Attack 2: Signed In as Someone Else (IDOR / Ownership Violation)
- **Browser Console Command**:
  ```js
  // Signed in as user "Chala Kebede" (id: usr_chala_kebede)
  await cancelOrder("1"); // Targeting Order #1 owned by "Abebe Bikila" (id: usr_abebe)
  // Expectation: Refused on ownership, not on session.
  ```
- **Line That Stopped It**:
  - `app/actions/order.js`, Line 72:
    ```js
    if (order.sessionId !== session.id && session.role !== "staff") {
      return { error: "Forbidden: Not the record owner" };
    }
    ```
- **Observed Result**: The session was valid, but record comparison failed because `order.sessionId ("usr_abebe") !== session.id ("usr_chala_kebede")`. The action halted with `{ error: "Forbidden: Not the record owner" }`. The target order remained untouched in `preparing` status.

### Attack 3: Crafted Open Redirect via Sign-In Link
- **Browser URL Test**:
  ```
  /sign-in?next=https://example.com
  // Also tested: /sign-in?next=//example.com
  // Expectation: Lands on /, not on example.com.
  ```
- **Line That Stopped It**:
  - `app/actions/auth.js`, Line 27:
    ```js
    if (typeof rawNext === "string" && rawNext.startsWith("/") && !rawNext.startsWith("//")) {
      destination = rawNext;
    }
    ```
- **Observed Result**: The external domain target failed the relative URL validation check (`startsWith("/")` and `!startsWith("//")`). The server action sanitized the destination and defaulted to `"/"`. The visitor remained securely on Addis Eats.

---

## 4. Verification & Audit Checklist

1. **Can any script on your page read the session cookie?**  
   **No.** The cookie is set with `httpOnly: true, secure: true, sameSite: "lax"`. Client JavaScript (`document.cookie`) cannot access it.
2. **Does the orders page work if you change the ID in the URL to someone else's?**  
   **No.** `app/orders/[id]/page.js` checks `order.sessionId !== session.id` and renders an `Access Denied` gate.
3. **Does middleware run on image files?**  
   **No.** The matcher pattern strictly targets protected routes (`["/checkout", "/orders", "/orders/:path*"]`).
4. **Did all three attacks fail, and can you name the line that stopped each one?**  
   **Yes.** Attack 1 stopped by `app/actions/order.js:63`. Attack 2 stopped by `app/actions/order.js:72`. Attack 3 stopped by `app/actions/auth.js:27`.
5. **Is the staff link merely hidden, or actually refused server-side?**  
   **Refused server-side.** `app/kitchen/page.js` verifies `session.role === "staff"` on the server before rendering any markup.
6. **Is your signing secret absent from client JavaScript bundles?**  
   **Yes.** Secrets are accessed only on the server runtime and omit the `NEXT_PUBLIC_` prefix.
