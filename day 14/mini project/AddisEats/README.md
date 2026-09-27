# Addis Eats - Next.js Mini-Project

## Routes

| URL | File | Strategy |
|---|---|---|
| `/` | `app/page.tsx` | Static (SSG) |
| `/menu` | `app/menu/page.js` | ISR (revalidate: 60s) |
| `/menu/[id]` | `app/menu/[id]/page.js` | Static (SSG via generateStaticParams) |
| `/cart` | `app/cart/page.js` | Static (SSG) |
| `/checkout` | `app/checkout/page.js` | Dynamic (Server-rendered via cookies()) |

## Component Boundary Architecture

- `app/layout.tsx` - Root server component; wraps with client `<Providers>` using composition
- `app/components/Providers.js` - Isolated client provider shell (`"use client"`)
- `app/components/CartProvider.js` - Client Context provider for cart state (`"use client"`)
- `app/menu/layout.js` - Server Component shell; delegates interactivity to `<Counter />`
- `app/menu/Counter.js` - Isolated interactive leaf component (`"use client"`)
- `app/menu/FilterShell.js` - Interactive client wrapper receiving server-rendered dishes via `children` (`"use client"`)
- `app/menu/DishList.js` - Async server component; rendered on the server without shipping to client JS
- `app/menu/NavigationButton.js` - Client button using `useRouter()` (`"use client"`)
- `app/menu/error.js` - Client error boundary (`"use client"`)

## First Load JS & Boundary Measurements

- **Before Optimization**:
  - `app/menu/layout.js` carried `"use client"` directly, causing the layout, navigation, and children to be treated as client boundary dependencies.
  - Cart state and provider logic were bundled directly inside the main application flow.
- **After Optimization**:
  - `"use client"` shifted strictly to leaf components: `Counter.js`, `FilterShell.js`, `NavigationButton.js`, `CartProvider.js`, and `error.js`.
  - `DishList.js` runs as a pure Async Server Component streamed inside `FilterShell` via `{children}`: zero `DishList` code is bundled in the browser.
  - Root layout and menu layout remain pure Server Components.

## Build Output

```
Route (app)      Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ○ /cart
├ ƒ /checkout
├ ○ /Home
├ ○ /menu                1m      1y
└   /menu/[id]
  ├ ● /menu/1
  ├ ● /menu/2
  └ ● /menu/3

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```