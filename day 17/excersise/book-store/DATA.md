# Authentication & Authorization (Day 17)

Notes on session verification, secure cookies, middleware guards, open redirect protection, scoped queries, and server-side role-based access control.

---

## 1. Session Helper & Verification (`lib/auth.js`)
The `getSession` helper reads the `session` cookie and verifies its HMAC signature before decoding the payload:
- If no cookie exists, it returns `null`.
- If the cookie payload is modified or the signature is invalid, verification fails and returns `null`.
- If expired, it returns `null`.
- On success, it returns the user session (`{ id, name, role }`).

---

## 2. Secure Cookie Configuration (`lib/auth.js`)
On sign-in, the session cookie is written with security flags:
- `httpOnly: true`: Prevents client-side JavaScript access via `document.cookie` (mitigates XSS cookie theft).
- `secure: true`: Sent only over HTTPS in production.
- `sameSite: "lax"`: Prevents CSRF attacks during cross-site requests.
- `maxAge: 86400`: Expires after 24 hours.
- `path: "/"`: Accessible across all application routes.

---

## 3. Route Protection Middleware (`middleware.js`)
Middleware intercepts incoming requests before they hit page handlers:
- Uses `config.matcher: ["/checkout", "/orders", "/orders/:path*"]` to protect only sensitive checkout and order routes.
- Verifies the session cookie. Unauthenticated requests are redirected to `/sign-in`.

---

## 4. Carrying Destination with `next` Parameter
When an unauthenticated user attempts to visit `/checkout` or `/orders`:
- The middleware redirects to `/sign-in?next=/checkout`.
- The sign-in form preserves this parameter in a hidden input.
- Upon successful authentication, the user is forwarded directly to their intended page instead of the homepage.

---

## 5. Open Redirect Protection
To prevent attackers from crafting phishing links like `/sign-in?next=https://evil.com`:
- Destination values must start with `/` and must not start with `//` (protocol-relative URL bypass).
- Any invalid or external destination is rejected and falls back safely to `/`.

---

## 6. Scoped Orders Query & IDOR Prevention
Before scoping, any user could view all orders or query another account's order.
- `/orders` page filters the query: `orders.filter(o => o.sessionId === session.id)`.
- `/orders/[id]` and `/api/orders/[id]` check record ownership against `session.id`.
- Attempting to inspect another user's order returns a 403 Forbidden / Access Denied.

---

## 7. Server-Side Role Check (`/kitchen`)
A staff-only dashboard was added at `/kitchen`:
- The role check `session?.role === "staff"` is executed strictly server-side in the Server Component before any HTML is rendered.
- If a customer attempts to visit `/kitchen`, the server immediately returns a 403 Forbidden screen without shipping any kitchen orders markup to the client.
