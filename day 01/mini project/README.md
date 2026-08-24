# Addis Eats — Static React Menu

A static restaurant menu built with **Vite + React**. Displays a list of Ethiopian dishes using reusable components and props.

## How to run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Project structure

- `src/App.jsx` — Main app component; holds the dish data array and renders the menu with `map`.
- `src/components/Header.jsx` — Displays the restaurant name and tagline.
- `src/components/Dish.jsx` — Reusable component that receives `name` and `price` via props.
