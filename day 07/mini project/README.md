# Addis Eats - The Cart, Moved to a Store

A routed application for Addis Eats refactored to manage cart state with Zustand and authentication session with React Context.

## State Placement: Why the Cart is in a Store and Session is in Context

- **Cart State in Zustand Store (`cartStore.js`)**: The cart state updates frequently during user interactions (adding, removing, and clearing items). By moving the cart to a Zustand store with narrow selectors (`useCartStore(state => ...)`), only components subscribing to the specific slice of state (such as `CartBadge` or `Checkout`) re-render when the cart changes. Additionally, the `persist` middleware automatically saves and restores the order across page refreshes.
- **Auth Session in Context (`AuthContext.jsx` / `useAuth.js`)**: The auth session changes rarely (only during login and logout) and is needed broadly across routing guards (`RequireAuth`) and navigation, making React Context behind a guarded `useAuth` hook a clean and native solution.

## Routes

| Path | Component | Description |
| --- | --- | --- |
| `/` | `Home` | Landing page welcoming users with link to explore the menu. |
| `/menu` | `Menu` | Displays menu with shareable category filters (`/menu?category=Vegan`) and search. |
| `/menu/:id` | `DishDetail` | Dynamic route reading dish ID with `useParams` and showing full dish information. |
| `/cart` | `Cart` | Displays cart items from Zustand store, total ETB, and link to checkout. |
| `/checkout` | `Checkout` | Guarded route protected by `RequireAuth`. Confirms and places the order. |
| `/login` | `Login` | Sign-in screen for unauthenticated users, redirects back to destination upon login. |
| `*` | `NotFound` | Catch-all 404 page for nonexistent routes. |
