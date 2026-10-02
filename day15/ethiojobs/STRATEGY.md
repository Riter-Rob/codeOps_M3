# EthioJobs - Rendering Strategy & Route Architecture

| Route | Strategy | Reason |
|---|---|---|
| `/` | Static (SSG) | Landing page content and featured listings are pre-rendered for maximum speed. |
| `/jobs` | Dynamic (Server-rendered) | Reads incoming `searchParams` (`search`, `category`, `location`) at request time. |
| `/jobs/[id]` | Static (SSG via `generateStaticParams`) | Pre-renders top jobs (`1`, `2`, `3`) at build time for instant delivery. |
| `/companies` | Static (SSG) | Companies directory updates infrequently and is statically pre-rendered. |
| `/companies/[id]` | Dynamic | Queries company record and current open vacancies. |
| `/saved` | Static Shell + Client Hydration | Page shell is statically rendered; bookmarked IDs are read from client `localStorage`. |
| `/applications` | Dynamic | Reads the latest submitted applications on each request. |
| `/post-job` | Static Shell with Server Action | Form shell is static; submission triggers `postJob` server action. |
