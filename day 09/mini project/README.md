# Addis Eats - The Cart & Checkout

A routed application for Addis Eats refactored to manage cart state with Zustand, authentication session with React Context, and a fully accessible, robust checkout form.

## State Placement: Why the Cart is in a Store and Session is in Context

- **Cart State in Zustand Store (`cartStore.js`)**: The cart state updates frequently during user interactions (adding, removing, and clearing items). By moving the cart to a Zustand store with narrow selectors (`useCartStore(state => ...)`), only components subscribing to the specific slice of state (such as `CartBadge` or `Checkout`) re-render when the cart changes. Additionally, the `persist` middleware automatically saves and restores the order across page refreshes.
- **Auth Session in Context (`AuthContext.jsx` / `useAuth.js`)**: The auth session changes rarely (only during login and logout) and is needed broadly across routing guards (`RequireAuth`) and navigation, making React Context behind a guarded `useAuth` hook a clean and native solution.

## Validation Rules & Rationale

| Field | Rule | Why It Exists |
| --- | --- | --- |
| `name` | Required, trimmed, minimum 2 characters | Delivery drivers and restaurants must have a verified customer name to confirm order handover upon arrival. |
| `phone` | Required, TeleBirr format (`09XXXXXXXX` or `+2519XXXXXXXX`) | TeleBirr mobile wallet payment requests and SMS order confirmation updates require a valid Ethiopian telecom number. |
| `area` | Required, must match `Bole`, `Kazanchis`, `Megenagna`, or `Piassa` | Addis Eats operates dedicated rider pools in specific delivery clusters to guarantee food arrives hot and within estimated delivery times. |
| `notes` | Optional, maximum 200 characters | Allows customers to specify apartment, gate, or landmark instructions without risking payload truncation or database overflow. |

## Form States & Behavior

1. **Pristine / Untouched**: Initial state. Fields remain quiet with no disruptive error messages until visited.
2. **Touched & Invalid**: When a user leaves a field (`onBlur`) without providing valid input, the error message appears immediately.
3. **Live Correction**: Once touched, error messages update on every keystroke, clearing immediately when valid.
4. **Accessible Feedback**: Every field connects `<label htmlFor="...">`, `aria-invalid`, `aria-describedby`, and `role="alert"`. Visual feedback includes a prominent border and a `[!]` symbol so that errors are clearly identifiable even on greyscale displays.
5. **Submitting**: Pressing the submit button or pressing Enter sets `isSubmitting` to true, disables the button, and displays the ETB total in the label, preventing duplicate submissions.
6. **Failed Request Recovery**: When an order request fails, the failure reason is rendered in a high-priority alert banner, all user-entered values are preserved, and focus is automatically returned to the bad field.

## Routes

| Path | Component | Description |
| --- | --- | --- |
| `/` | `Home` | Landing page welcoming users with link to explore the menu. |
| `/menu` | `Menu` | Displays menu with shareable category filters (`/menu?category=Vegan`) and search. |
| `/menu/:id` | `DishDetail` | Dynamic route reading dish ID with `useParams` and showing full dish information. |
| `/cart` | `Cart` | Displays cart items from Zustand store, total ETB, and link to checkout. |
| `/checkout` | `Checkout` | Guarded route protected by `RequireAuth`. Confirms details and places order. |
| `/login` | `Login` | Sign-in screen for unauthenticated users, redirects back to destination upon login. |
| `*` | `NotFound` | Catch-all 404 page for nonexistent routes. |
