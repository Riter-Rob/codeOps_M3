# Addis Eats - Next.js Mini-Project

## Routes

| URL | File | Strategy |
|---|---|---|
| `/` | `app/page.tsx` | Static (SSG) |
| `/menu` | `app/menu/page.js` | ISR (revalidate: 60s) |
| `/menu/[id]` | `app/menu/[id]/page.js` | Static (SSG via generateStaticParams) |
| `/cart` | `app/cart/page.js` | Static (SSG) |
| `/checkout` | `app/checkout/page.js` | Dynamic (Server-rendered via cookies()) |
| `/orders` | `app/orders/page.js` | Server-rendered with SWR hydration |
| `/order-status` | `app/order-status/page.js` | Server-rendered with 5s SWR polling |

## Component Boundary Architecture

- `app/layout.tsx` - Root server component; wraps with client `<Providers>` using composition
- `app/components/Providers.js` - Isolated client provider shell (`"use client"`)
- `app/components/CartProvider.js` - Client Context provider for cart state (`"use client"`)
- `app/menu/layout.js` - Server Component shell; delegates interactivity to `<Counter />`
- `app/menu/Counter.js` - Isolated interactive leaf component (`"use client"`)
- `app/menu/FilterShell.js` - Interactive client wrapper receiving server-rendered dishes via `children` (`"use client"`)
- `app/menu/DishList.js` - Async server component; rendered on the server without shipping to client JS
- `app/menu/DishSearch.js` - Debounced search with null key, keepPreviousData, and URL pagination (`"use client"`)
- `app/orders/OrderStatus.js` - Live polling order status card using `useSWR` (`"use client"`)
- `app/menu/NavigationButton.js` - Client button using `useRouter()` (`"use client"`)
- `app/menu/error.js` - Client error boundary (`"use client"`)

## First Load JS & Boundary Measurements

- **Before Optimization**:
  - `app/menu/layout.js` carried `"use client"` directly, causing the layout, navigation, and children to be treated as client boundary dependencies.
  - Cart state and provider logic were bundled directly inside the main application flow.
- **After Optimization**:
  - `"use client"` shifted strictly to leaf components: `Counter.js`, `FilterShell.js`, `NavigationButton.js`, `CartProvider.js`, `DishSearch.js`, `OrderStatus.js`, and `error.js`.
  - `DishList.js` runs as a pure Async Server Component streamed inside `FilterShell` via `{children}`: zero `DishList` code is bundled in the browser.
  - Root layout and menu layout remain pure Server Components.

## API Endpoints

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/dishes` | Returns paginated/filtered dishes | `200 OK` |
| `GET` | `/api/dishes/[id]` | Returns single dish by ID | `200 OK`, `404 Not Found` |
| `GET` | `/api/orders` | Returns full orders list | `200 OK` |
| `GET` | `/api/orders/[id]` | Returns single order by ID | `200 OK`, `404 Not Found` |
| `POST` | `/api/orders` | Validates & creates a new order | `201 Created`, `422 Unprocessable Entity` |

## Server Actions

- `placeOrder`: Server action that processes checkout submissions, validates inputs using the Day 33 schema, associates record ownership with the current session, appends to orders store, and calls `revalidatePath("/checkout")` and `revalidatePath("/orders")`.
- `cancelOrder`: Server action that verifies active session and record ownership before cancelling the order and revalidating paths.

## Day 16: Live Data & Network Tab Observations

### Network Tab While Typing
- **Empty input**: Zero requests fire. SWR key is `null`, which pauses fetching completely.
- **Continuous typing**: When typing multiple characters (e.g. typing "Shiro"), each keystroke resets the 300ms debounce timer. No network request fires while actively typing.
- **Typing pause**: Exactly 300ms after the last keystroke, a single `GET /api/dishes?search=Shiro&page=1` request appears in the Network tab.
- **UI stability**: While the new request is in flight, `keepPreviousData: true` prevents the current list from blanking out or flickering.

### Network Tab During Polling
- On `/order-status` (and `/orders/1`), a `GET /api/orders/1` request appears in the Network tab every 5 seconds (`refreshInterval: 5000`).
- Initial paint renders immediately on the server with `fallbackData`, producing zero loading spinners on first paint.