# Addis Eats - Next.js Mini-Project

## Routes

| URL | File | Strategy |
|---|---|---|
| `/` | `app/page.tsx` | Static (SSG) |
| `/menu` | `app/menu/page.js` | ISR (revalidate: 60s) |
| `/menu/[id]` | `app/menu/[id]/page.js` | Static (SSG via generateStaticParams) |
| `/cart` | `app/cart/page.js` | Static (SSG) |
| `/checkout` | `app/checkout/page.js` | Dynamic (Server-rendered via cookies()) |

## Menu Segment

- `app/menu/layout.js` - Nested layout with persistent category sidebar and counter state
- `app/menu/loading.js` - Loading UI
- `app/menu/error.js` - Error UI
- `app/menu/not-found.js` - Not-found UI
- `app/menu/DishList.js` - Async dish list component streamed inside Suspense
- `app/menu/CategoryBar.js` - Menu component, not a route
- `app/menu/NavigationButton.js` - Client navigation component

## Dynamic Menu Route

The `/menu/[id]` page generates static parameters at build time using `generateStaticParams()`:
- `/menu/1`
- `/menu/2`
- `/menu/3`

If a dish does not exist, `notFound()` is called and `not-found.js` is displayed.

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