# Addis Eats, Routed

A multi-page React application for Addis Eats built with React Router.

## Routes

| Path | Component | Description |
| --- | --- | --- |
| `/` | `Home` | Landing page welcoming users to Addis Eats with link to explore the menu. |
| `/menu` | `Menu` | Displays the menu with shareable category filters (`/menu?category=Vegan`) and live search. |
| `/menu/:id` | `DishDetail` | Dynamic route reading the dish ID with `useParams` and showing full dish information. |
| `/cart` | `Cart` | Displays cart items, order total, remove buttons, and button to proceed to checkout. Survives navigation. |
| `/checkout` | `Checkout` | Guarded route protected by `RequireAuth`. Confirms and places the order. |
| `/login` | `Login` | Sign-in screen for unauthenticated users, redirects back to previous destination upon login. |
| `*` | `NotFound` | Catch-all 404 page for nonexistent routes. |

## Key Features

- **Nested Routing**: Defined inside `Layout.jsx` with shared `<Header>`, `<Navbar>`, and `<Footer>`.
- **Query String Filter**: `/menu?category=Vegan` allows sharing filtered views directly via URL.
- **Cart Persistence**: `CartProvider` wraps the router so the cart state survives route navigation.
- **Protected Checkout**: `RequireAuth` guards `/checkout`, redirects unauthenticated users to `/login`, and returns them after sign-in.
