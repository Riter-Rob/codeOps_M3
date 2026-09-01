# Addis Eats Week 1 Project

A React menu app built from everything learned in Days 26 to 30.

## What each hook contributes

### `useFetch.js`
Wraps `fetch` with an `AbortController` so the in flight request is cancelled whenever the component unmounts or the URL changes. Returns `{ data, loading, error }` so every caller gets all three states without writing them by hand.

### `cartReducer.js`
A pure function with no React and no side effects. Takes the current state and an action object and returns the next state. Three cases: `add` pushes a dish into the items array, `remove` filters it out by id, `clear` resets to an empty array. Because it is pure it can be tested directly with plain objects before any component is involved.

### `CartProvider.jsx`
Holds the single source of truth for the cart. Calls `useReducer` with `cartReducer` and exposes `items`, `dispatch`, and `total` through context. The context value is wrapped in `useMemo` so React only creates a new object when `items` or `total` actually change. Without this, every render of `CartProvider` would produce a new object reference and force every consumer to re-render even if the cart data is identical.

### `CartBadge.jsx`
Reads `items.length` from `CartContext` using `useContext`. It sits inside `Header` but receives zero cart props. The context tree delivers the data directly.

### `Menu.jsx`
Uses `useFetch` to load the menu. Filters dishes client-side by category and search. `DishList` wraps `handleAdd` in `useCallback` with `dispatch` as the dependency so the same function reference is passed to every `Dish` on each render. Paired with `React.memo` on `Dish` this prevents individual dish cards from re-rendering when unrelated state changes.
