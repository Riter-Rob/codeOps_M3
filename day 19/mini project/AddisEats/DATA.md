# Live Data Strategy & Query Architecture (DATA.md)

This document outlines the queries, cache keys, refresh rules, and design rationale for Addis Eats.

---

## Query Inventory

| Query | Key | Refresh Rule | Reasoning |
|---|---|---|---|
| Order Status | `/api/orders/${id}` | `refreshInterval: 5000`, `revalidateOnFocus: true` | Active delivery status changes periodically in real time and needs periodic polling without overwhelming the server. |
| Dishes Search | `/api/dishes?search=${term}&page=${page}` (or `null` when term is empty) | On-demand (debounced 300ms), `keepPreviousData: true` | Prevents firing requests on empty input or every keystroke, while keeping existing results on screen during search transitions. |
| Dishes Menu (All) | `/api/dishes` | On-mount / ISR (60s) | The overall menu catalog updates infrequently during operating hours. |

---

## Client-Side Data Problems Solved

### 1. Order Status: Server-Rendered with 5-Second Polling
- **Server component initial fetch**: The server fetches the initial order record and supplies it as `fallbackData` to `<OrderStatus />`.
- **First paint**: The component renders immediately with full order details; no loading spinner or layout shift occurs.
- **Polling**: SWR polls `/api/orders/${id}` every 5000ms (`refreshInterval: 5000`). When the browser window is out of focus, polling pauses automatically.

### 2. Menu Search: Debounced with Null Key
- **Null Key**: When the search input is empty (`""`), the key is set to `null`. SWR skips fetching completely.
- **300ms Debounce**: Typing rapidly (e.g. 5 keystrokes) clears and resets the timer, dispatching only 1 network request after typing stops.
- **No race conditions**: SWR automatically discards out-of-order responses from earlier queries.

### 3. Paged Dish List: No Flashing with `keepPreviousData`
- **`keepPreviousData: true`**: When switching pages (`?page=1` -> `?page=2`) or updating search terms, SWR keeps displaying previous items until the new page payload finishes loading.
- **URL Query String**: The active page is stored in `?page=` so the list view is bookmarkable, shareable, and responds to browser back/forward buttons.

---

## Verification & Self-Check

- **Does typing five characters fire one request or five?**
  One request. The 300ms debounce timer restarts on every keystroke, only dispatching once the user pauses typing.
- **Does the order page show data immediately, with no spinner?**
  Yes. `fallbackData` pre-populates SWR's cache from the server component before the client executes a network request.
- **Do two components asking for the same key produce one network call?**
  Yes. SWR deduplicates simultaneous requests for the exact same key into a single HTTP call.
- **Does the list keep previous results visible while the next load runs?**
  Yes. `keepPreviousData: true` preserves the existing result set in the DOM during background loading.
- **Can you justify every refreshInterval in one sentence?**
  Orders update during delivery and need fresh status checks every 5 seconds, whereas menu items are relatively static and only update on demand or with ISR.
