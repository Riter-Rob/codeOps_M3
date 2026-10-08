# DATA.md — Query Architecture & Data Fetching Strategy

This document details the data fetching architecture, query boundaries, cache strategies, and refresh rules for Addis Eats, adhering to the principle: **Server unless the person triggers it; then seed the exception with fallbackData.**

---

## 1. Decision Two: Where Data is Fetched

| Data | Where, and Why | Key / Endpoint | Refresh Rule |
|---|---|---|---|
| **Menu and dishes** | **Server** — public, indexable, cacheable | Static / ISR (`revalidate: 60s`) | Revalidates every 60 seconds; static generation for dish details (`generateStaticParams`). |
| **Order history** | **Server** — private, scoped to the session | Server component via `getOrdersForUser(session.id)` | On-demand on request; scoped strictly to verified cookie session. |
| **Order status** | **Server first, then polled on the client** | `/api/orders/${id}` via SWR | Server renders initial status (`fallbackData`), client polls every 5 seconds (`refreshInterval: 5000`). |
| **Menu search** | **Client** — triggered by typing, debounced | `/api/dishes?search=${term}&page=${page}` via SWR | Debounced 300ms; `null` key when input is blank; `keepPreviousData: true` during page transitions. |
| **Cart** | **Client store** — never leaves the browser | `CartContext` / Local Storage | Synchronous in-memory state; zero server round-trips until checkout. |

---

## 2. Core Principles & Problem Solutions

### A. "Server unless the person triggers it"
- Four out of five data entities (Menu, Dish details, Order history, and initial Order status) render directly on the server as React Server Components.
- This minimizes client bundle size, ensures fast First Contentful Paint (FCP), allows search engine crawlers to parse complete HTML, and eliminates client-side waterfall requests.

### B. "Then seed the exception"
- Where client-side querying is unavoidable (live delivery status updates or interactive catalog searching), the server renders the first result and supplies it to SWR as `fallbackData`.
- **Zero-Spinner Arrival**: A customer arriving at `/order-status?id=1` or `/orders/1` sees full order information on the very first paint. There is no loading spinner for data the server already had in memory.
- Polling begins 5 seconds after hydration without ever displacing the initial layout.

### C. Menu Search Debouncing & Null Keys
- **Null Key**: When the search query is blank (`""`), SWR's cache key resolves to `null`. This pauses fetching completely and avoids firing useless empty queries.
- **300ms Debounce**: Rapid keystrokes clear and reset the debounce timer. Typing "Shiro" fires exactly 1 network request after typing ceases, rather than 5 concurrent requests.
- **No Race Conditions**: SWR automatically invalidates and ignores stale out-of-order responses from preceding queries.

### D. Paged Dish List with `keepPreviousData`
- Navigating between pages (`?page=1` to `?page=2`) keeps previous records visible on-screen until the incoming page payload finishes resolving.
- Eliminates page flashing and layout shifts during search/pagination transitions.

---

## 3. Query Inventory & Verification

| Query | Key | Refresh Rule | Rationale |
|---|---|---|---|
| **Order Status** | `/api/orders/${id}` | `refreshInterval: 5000`, `revalidateOnFocus: true` | Delivery progress changes in real-time; 5-second polling provides timely updates without server overload. |
| **Dishes Search** | `/api/dishes?search=${term}&page=${page}` (or `null`) | 300ms debounce, `keepPreviousData: true` | Client-driven interaction; prevents spamming the server on every keystroke. |
| **Dishes Menu (All)** | `/api/dishes` | ISR (60s) / Static SSG | Menu catalog is stable during service hours; caching improves throughput and edge latency. |

### Verification Answers
1. **Does typing five characters fire one request or five?**  
   **One request.** The 300ms timer resets on each keystroke, dispatching only after the user pauses typing.
2. **Does the order page show data immediately, with no spinner?**  
   **Yes.** Server pre-rendering seeds `fallbackData`, rendering order details instantly on arrival.
3. **Do two components asking for the same key produce one network call?**  
   **Yes.** SWR deduplicates in-flight requests for identical keys into a single HTTP fetch.
4. **Does the list keep previous results visible while the next load runs?**  
   **Yes.** `keepPreviousData: true` holds previous cards in place until the next page arrives.
