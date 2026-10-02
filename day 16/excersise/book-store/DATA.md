# Data Fetching with SWR (Day 16)

Notes on converting data fetching from manual `useEffect` / `useState` to SWR, adding polling, fallback data, conditional search, and pagination.

---

## 1. Shared Fetcher (`lib/fetcher.js`)
Instead of duplicating `fetch(url).then(res => res.json())` across components, we centralize it in `lib/fetcher.js`:
```js
export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
```
SWR automatically passes the cache key (the URL) into this fetcher.

---

## 2. Removing `useEffect` and `useState` in Order Status
Before SWR, tracking data and loading state required manual plumbing:
- `useState` for order data
- `useState` for loading
- `useState` for errors
- `useEffect` with cleanup to fetch on mount or id change

With `useSWR`, all of that boilerplate is removed:
```js
const { data: order, error } = useSWR(`/api/orders/${id}`, fetcher, {
  fallbackData,
  refreshInterval: 3000
});
```
SWR manages cache, re-renders, and deduping automatically.

---

## 3. Polling with `refreshInterval`
Adding `refreshInterval: 3000` tells SWR to poll `/api/orders/${id}` every 3 seconds.
- **Network tab verification**: Opening Chrome DevTools Network tab shows a new `GET /api/orders/1` request firing every 3 seconds while the tab is focused.
- If the browser tab loses focus, SWR pauses polling by default to save resources, then resumes when refocusing.

---

## 4. Server Component Pre-rendering with `fallbackData`
To avoid showing a blank loading spinner on the initial page load, the Server Component loads the initial order on the server and passes it to the client component:
```js
// app/orders/page.js (Server Component)
const initialOrder = orders[0];
return <OrderStatus id={initialOrder.id} fallbackData={initialOrder} />;
```
Inside `OrderStatus`:
- SWR immediately displays `fallbackData` on first render without waiting for a client-side fetch.
- It then initiates background revalidation and polling based on `refreshInterval`.

---

## 5. Debounced Search Box with `null` Key
When the user hasn't typed anything, we should not make search requests to the server.
SWR supports conditional fetching by passing `null` as the key:
```js
const key = debouncedTerm.trim()
  ? `/api/dishes?search=${encodeURIComponent(debouncedTerm.trim())}&page=${page}`
  : null;

const { data } = useSWR(key, fetcher, { keepPreviousData: true });
```
- If `debouncedTerm` is empty, `key` is `null`. SWR makes 0 network requests.
- As the user types, a 300ms debounce timer prevents firing requests on every keystroke.

---

## 6. Preventing UI Flicker with `keepPreviousData`
Without `keepPreviousData`, changing the SWR key (e.g. typing a new letter or switching pages) sets `data` to `undefined` while fetching, which makes the list flash or disappear.
- Setting `keepPreviousData: true` keeps the existing list on screen while the new request is in-flight.
- When the new response arrives, the UI updates smoothly in place.

---

## 7. URL Query String Pagination
Pagination is synced with the URL query string (`?page=1`, `?page=2`):
- `useSearchParams().get("page")` reads the current page number.
- Clicking "Next" or "Previous" pushes the updated query string using `router.push("?page=...")`.
- The URL stays bookmarkable and shareable, and browser back/forward navigation works as expected.
