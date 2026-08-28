# Addis Eats

A typed, filtered menu built with React. Practices PropTypes, the `children` prop, conditional rendering with a boolean guard, and list rendering with stable keys.

## What it does

- `Dish` — a typed card with a currency default (`ETB`) and a conditionally rendered spicy badge.
- `Card` — a reusable wrapper built with the `children` prop.
- `Menu` — filters a static menu by category, shows an empty state when nothing matches, and renders the list with each dish's `id` as the key.

## Data

The static menu lives in `src/data.js`: an array of dishes with `id`, `name`, `price`, `category`, and `spicy`.

## How to run

Install the packages:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Check the console for PropTypes warnings.

## Checklist

- [x] Dish declares PropTypes — `name` and `price` required, `spicy` optional
- [x] Spicy badge renders only when `spicy` is true (boolean guard, no stray `0`)
- [x] Card wrapper renders whatever `children` it is given
- [x] Menu filters by category and shows an empty state when none match
- [x] Every list item keyed by a stable `id`, not the array index
