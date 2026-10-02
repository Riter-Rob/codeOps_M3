# Server / Client Boundary Map

| Component / File | Side | Reason / Responsibility |
|---|---|---|
| `app/layout.js` | Server | Provides root layout, HTML shell, navigation and metadata without client-side state. |
| `app/page.js` | Server | Static home landing content with zero client JS dependencies. |
| `app/menu/layout.js` | Server | Passes children into category sidebar navigation shell. |
| `app/menu/page.js` | Server | Awaits `getDishes()` data directly on server without extra network fetch hops. |
| `app/menu/[id]/page.js` | Server | Resolves async params and static generation with `generateStaticParams()`. |
| `app/menu/loading.js` | Server | Instant loading placeholder streamed before menu data resolves. |
| `app/menu/error.js` | Client | Requires client boundary for `onClick` and `reset()` interactive recovery handler. |
| `app/not-found.js` | Server | Static 404 UI rendered when `notFound()` is triggered. |
| `app/cart/page.js` | Server | Server component wrapper isolating client boundary strictly to interactive leaf. |
| `components/CartClient.jsx` | Client | Manages interactive browser state (`useState`) for quantity updates and running totals. |
| `app/checkout/page.js` | Server | Delivers checkout page structure without bundling form state in page shell. |
| `app/checkout/CheckoutForm.js` | Client | Uses `useActionState` to track pending submissions and display validation errors. |
