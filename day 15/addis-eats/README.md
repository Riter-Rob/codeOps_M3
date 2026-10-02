# Addis Eats — Next.js Foundations Project (Day 40)

Addis Eats rebuilt on Next.js App Router featuring file-based routing, nested layouts, deliberate rendering strategies per route, Server Components fetching direct data, Server Actions with progressive enhancement, and Route Handlers with HTTP status validation.

## Routes & Strategies

| Route | File | Rendering Strategy | Description |
|---|---|---|---|
| `/` | `app/page.js` | Static (SSG) | Landing page with welcome copy and menu link |
| `/menu` | `app/menu/page.js` | ISR (`revalidate: 3600`) | Direct server data fetching with category filter |
| `/menu/[id]` | `app/menu/[id]/page.js` | Static via params | Pre-rendered via `generateStaticParams()` with `notFound()` fallback |
| `/cart` | `app/cart/page.js` | Client Leaf | Server page delegating state to `components/CartClient.jsx` |
| `/checkout` | `app/checkout/page.js` | Dynamic | Form mutation backed by `placeOrder` Server Action |

## API Endpoints

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `POST` | `/api/orders` | Validates and records new order | `201 Created`, `422 Unprocessable Entity` |

## Server Actions

- `placeOrder`: Server action in `app/actions.js` validating full name (min 2 chars) and Ethiopian phone number (`09XXXXXXXX`). Supports progressive enhancement and form resets.

## How to Run

```bash
# Development
npm run dev

# Production Build
npm run build
npm run start
```

## Endpoint Verification via cURL

```bash
# Valid order submission (201 Created)
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Almaz\",\"phone\":\"0911223344\"}"

# Invalid order submission (422 Unprocessable Entity)
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"A\",\"phone\":\"0912\"}"
```

## Six Failure Checks

1. **Slow 3G Simulation**: `loading.js` displays immediate loading feedback while dishes load.
2. **Menu Error State**: `error.js` catches runtime issues and offers interactive recovery via `reset()`.
3. **Missing Resource**: Navigating to `/menu/9999` renders custom `not-found.js` instead of crashing.
4. **Invalid Input Handling**: Server validation returns 422 with field-specific errors attached to the input.
5. **No JavaScript / Progressive Enhancement**: The checkout form uses a native `<form action={placeOrder}>` and completes submissions even if browser scripting is disabled.
6. **Bundle Security**: No sensitive secrets or database credentials are leaked to client bundles.
