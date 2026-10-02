# Addis Eats - Component Boundary Architecture

| Component | Path | Boundary | Justification |
|---|---|---|---|
| `RootLayout` | `app/layout.tsx` | **Server** | Renders outer HTML shell, imports static global CSS; needs no client interactivity. |
| `Providers` | `app/components/Providers.js` | **Client** | Wraps client-side React Context providers cleanly without turning `RootLayout` into a client component. |
| `CartProvider` | `app/components/CartProvider.js` | **Client** | Uses React Context (`createContext`, `useState`) to manage client-side cart state. |
| `HomePage` | `app/page.tsx` | **Server** | Pure static landing page with standard navigation links. |
| `CartPage` | `app/cart/page.js` | **Server** | Static page shell; interacts with cart items on client when needed. |
| `CheckoutPage` | `app/checkout/page.js` | **Server (Dynamic)** | Reads incoming HTTP request `cookies()` on the server; requires zero client-side React hooks. |
| `MenuLayout` | `app/menu/layout.js` | **Server** | Persistent layout shell hosting sidebar markup; delegates interactivity to isolated `Counter`. |
| `Counter` | `app/menu/Counter.js` | **Client** | Isolated leaf component with button click handlers and `useState` counter. |
| `MenuPage` | `app/menu/page.js` | **Server (Async)** | Async server component orchestrating data flow without client data-fetching hooks. |
| `FilterShell` | `app/menu/FilterShell.js` | **Client** | Client wrapper managing filter UI state (`useState`), passing server content via `children`. |
| `DishList` | `app/menu/DishList.js` | **Server (Async)** | Directly awaits dishes data on the server; never bundled as client JavaScript. |
| `CategoryBar` | `app/menu/CategoryBar.js` | **Server** | Simple category labels/markup with no state or listeners attached. |
| `NavigationButton` | `app/menu/NavigationButton.js` | **Client** | Uses `useRouter()` hook and `onClick` event handler for programmatic navigation. |
| `DishPage` | `app/menu/[id]/page.js` | **Server (Async)** | Awaits dynamic route params and statically generates pre-rendered pages via `generateStaticParams`. |
| `Error` | `app/menu/error.js` | **Client** | Next.js requires route error boundaries to be Client Components to handle runtime recovery (`reset()`). |
| `Loading` | `app/menu/loading.js` | **Server** | Pure fallback skeleton UI rendered by Next.js streaming boundary. |
| `NotFound` | `app/menu/not-found.js` | **Server** | Static 404 response UI. |
