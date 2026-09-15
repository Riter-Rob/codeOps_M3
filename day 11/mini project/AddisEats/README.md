# Addis Eats - Next.js Mini-Project

## Routes

| URL | File |
|---|---|
| `/` | `app/page.tsx` |
| `/menu` | `app/menu/page.js` |
| `/menu/[id]` | `app/menu/[id]/page.js` |
| `/cart` | `app/cart/page.js` |
| `/checkout` | `app/checkout/page.js` |

## Menu Segment

- `app/menu/loading.js` - Loading UI
- `app/menu/error.js` - Error UI
- `app/menu/not-found.js` - Not-found UI
- `app/menu/DishList.js` - Menu component, not a route
- `app/menu/CategoryBar.js` - Menu component, not a route
- `app/menu/NavigationButton.js` - Client navigation component

## Dynamic Menu Route

The `/menu/[id]` page reads the `id` from the route `params`.

Example:

`/menu/123`

displays the dish with ID `123`.

If the dish does not exist, `notFound()` is called and `not-found.js` is displayed.

## Navigation

Internal navigation uses Next.js `Link`.

Programmatic navigation is demonstrated using `useRouter()` inside a client component.