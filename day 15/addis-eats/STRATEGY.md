# Rendering Strategy

| Route | Rendering Strategy | Justification |
|---|---|---|
| `/` | Static (SSG) | Marketing landing page with static content and links; does not depend on request or session data. |
| `/menu` | ISR (revalidate: 3600) | Dishes change infrequently throughout the day; served from cache and revalidated every hour. |
| `/menu/[id]` | Static via params (SSG) | Dish IDs are known ahead of time and pre-rendered with `generateStaticParams()`. |
| `/cart` | Client | Interactive cart state is private to the browser session and requires local client state. |
| `/checkout` | Dynamic | Form mutation uses a Server Action with server-side validation and progressive enhancement. |
