# AUTH.md — Addis Eats Security Architecture

## 1. Protected Routes & Defense-in-Depth Layers

| Route / Surface | Layer 1: Middleware | Layer 2: Server Component | Layer 3: Server Action / Route Handler | What Each Layer Proves |
|---|---|---|---|---|
| `/checkout` | `middleware.js` checks session token & redirects unauthenticated visitors to `/sign-in?next=/checkout` | `app/checkout/page.js` verifies `await getSession()` server-side; redirects if session is missing | `placeOrder` action verifies active session and assigns record ownership to `session.id` | Middleware ensures instant edge redirect; Page component prevents rendering if middleware is bypassed; Action ensures only authenticated writes occur |
| `/orders` | `middleware.js` checks session token & redirects unauthenticated visitors to `/sign-in?next=/orders` | `app/orders/page.js` verifies `await getSession()` server-side; scopes query to `session.id` | `cancelOrder` action verifies session and verifies caller is record owner | Middleware guards navigation; Page ensures private listing cannot display other accounts' data; Action stops unauthorized mutation |
| `/orders/[id]` | `middleware.js` covers `/orders/:path*` | `app/orders/[id]/page.js` verifies `await getSession()` and compares `order.sessionId === session.id` | `GET /api/orders/[id]` rejects cross-account reads with 403 Forbidden | Verifies that direct URL navigation to another customer's order ID cannot read sensitive order details |
| `/kitchen` | Intentionally excluded from middleware matcher | `app/kitchen/page.js` verifies `await getSession()` and enforces `session.role === "staff"` | Server-side role gate returns HTTP 403 Forbidden before markup rendering | Proves role-based access control (RBAC) is enforced server-side rather than hidden in client markup |
| `placeOrder` (Action) | Bypasses middleware (direct POST/action invocation) | N/A | `app/actions/order.js:11` verifies `session` exists before writing | Proves server actions cannot be executed anonymously even from browser console or curl |
| `cancelOrder` (Action) | Bypasses middleware (direct POST/action invocation) | N/A | `app/actions/order.js:63` verifies session; line 72 verifies `order.sessionId === session.id` | Proves horizontal privilege escalation (IDOR) is stopped at mutation time |

---

## 2. The Three Attacks Against Addis Eats

### Attack 1: Calling a Server Action While Signed Out
- **Attack Scenario**: An attacker opens browser DevTools console or sends a direct POST request to invoke the server action `cancelOrder("1")` or `placeOrder` without an active session cookie.
- **Line That Stopped It**:
  - `app/actions/order.js`, Line 63:
    ```js
    if (!session) {
      return { error: "Unauthorized: Active session required" };
    }
    ```
  - `app/actions/order.js`, Line 11:
    ```js
    if (!session) {
      return { fieldErrors: { auth: "Unauthorized: Active session required" }, success: false };
    }
    ```
- **What Happened**: The action executed on the server, inspected the request cookies via `getSession()`, found no valid signed session cookie, and immediately returned an unauthorized response without altering database records or modifying order status.

### Attack 2: Cross-Account Action Invocation (IDOR)
- **Attack Scenario**: Attacker signs in with legitimate credentials as user "Chala Kebede" (`session.id: usr_chala_kebede`), but submits a cancellation request targeting Order #1 which belongs to "Abebe Bikila" (`sessionId: usr_abebe`).
- **Line That Stopped It**:
  - `app/actions/order.js`, Line 72:
    ```js
    if (order.sessionId !== session.id && session.role !== "staff") {
      return { error: "Forbidden: Not the record owner" };
    }
    ```
- **What Happened**: The server action retrieved the order, compared its stored `sessionId` against the verified caller's `session.id`, recognized the mismatch, and halted with `403 Forbidden: Not the record owner`. The order remained in `preparing` status.

### Attack 3: Open Redirect via Crafted Link
- **Attack Scenario**: An attacker crafts a phishing link:
  `http://localhost:3000/sign-in?next=https://evil-phishing-site.com`
  or a protocol-relative link:
  `http://localhost:3000/sign-in?next=//evil-phishing-site.com`
  hoping the application will redirect the user to their malicious domain immediately after authentication.
- **Line That Stopped It**:
  - `app/actions/auth.js`, Line 27:
    ```js
    if (typeof rawNext === "string" && rawNext.startsWith("/") && !rawNext.startsWith("//")) {
      destination = rawNext;
    }
    ```
- **What Happened**: `https://evil-phishing-site.com` failed `.startsWith("/")`. `//evil-phishing-site.com` failed `!rawNext.startsWith("//")`. The server action rejected the untrusted target and defaulted `destination` to `"/"`. The user was safely kept on Addis Eats.

---

## 3. Check Yourself Audit

1. **Can any script on your page read the session cookie?**
   - **No**. The cookie is created with `httpOnly: true`. `document.cookie` in client JavaScript cannot read or access the session cookie.
2. **Does the orders page work if you change the id in the URL to someone else’s?**
   - **No**. `app/orders/[id]/page.js` checks `order.sessionId !== session.id`. If another user's ID is loaded in the URL, the page displays `Access Denied` and blocks the order details.
3. **Does middleware run on your image files?**
   - **No**. The matcher is strictly configured to `["/checkout", "/orders", "/orders/:path*"]`. Static files, images (`.svg`, `.png`, `.jpg`), and public pages (`/menu`, `/cart`, `/`) do not trigger middleware.
4. **Did all three attacks fail, and can you name the line that stopped each one?**
   - **Yes**.
     - Attack 1 stopped by `app/actions/order.js:11` and `app/actions/order.js:63`.
     - Attack 2 stopped by `app/actions/order.js:72`.
     - Attack 3 stopped by `app/actions/auth.js:27`.
5. **Is the staff link merely hidden, or actually refused server-side?**
   - **Actually refused server-side**. In `app/kitchen/page.js`, `session.role !== "staff"` triggers an immediate server-rendered 403 Forbidden before any kitchen markup or order records are rendered.
6. **Is your signing secret absent from the JavaScript the browser downloads?**
   - **Yes**. `SESSION_SECRET` is read exclusively inside server files (`lib/auth.js`) and never prefixed with `NEXT_PUBLIC_`, ensuring it is completely stripped from client bundles.
