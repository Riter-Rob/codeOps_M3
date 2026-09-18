# Rendering Strategy & Route Architecture

| Route | Strategy | Reason |
|---|---|---|
| `/` | Static (SSG) | Landing page content is static and does not depend on request data or frequent updates. |
| `/cart` | Static (SSG) | Cart structure is statically rendered; client-side state manages item mutations. |
| `/checkout` | Dynamic (Server-rendered) | Reads incoming request `cookies()` at request time to personalize or inspect session data. |
| `/menu` | ISR (Incremental Static Regeneration - 60s) | Menu prices and dish availability change periodically without needing a full rebuild. |
| `/menu/[id]` | Static (SSG via `generateStaticParams`) | Dish detail pages are known at build time (`1`, `2`, `3`) and are pre-rendered into static HTML. |
