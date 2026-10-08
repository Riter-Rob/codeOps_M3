# DATA.md — EthioJobs Capstone Data Architecture

This document specifies the data fetching strategy, client vs server boundaries, caching parameters, and refresh rules for the EthioJobs capstone.

---

## 1. Decision Two: Where Data is Fetched

| Data Stream | Where, and Why | Key / Endpoint | Refresh Rule |
|---|---|---|---|
| **Featured Jobs & Companies** | **Server** — public, indexable, high SEO value | Static / SSG (`app/page.js`) | Pre-rendered at build time; revalidated on new job posts. |
| **Filtered Job Catalog** | **Server (Async)** — query parameter driven | Dynamic (`app/jobs/page.js`) | Re-rendered on request using `searchParams` without client waterfalls. |
| **Job Details** | **Server** — public, static | Static SSG (`app/jobs/[id]/page.js`) | Pre-renders top jobs via `generateStaticParams()`. |
| **Company Profiles** | **Server** — static & cacheable | SSG / Dynamic (`app/companies/[id]/page.js`) | Pre-rendered profiles with company vacancy listings. |
| **Interactive Search & Filter** | **Client** — debounced URL synchronization | `JobSearch.jsx` & `JobFilters.jsx` | 300ms debounce on search input; pushes URL search params to trigger server component render. |
| **Saved Jobs** | **Client store** — local to visitor | `localStorage` | Synchronous client storage; zero network overhead. |
| **Application Tracker** | **Server** — private to applicant | Scoped Server Component | Rendered on request; scoped to `session.id`. |

---

## 2. Architecture Principles

1. **Server First for Public Content**: Jobs, descriptions, salaries, and company overviews render as Server Components so search engines and job aggregators index full text without running JavaScript.
2. **Debounced Search**: Search inputs debounce typing (300ms) before updating URL query parameters, avoiding wasted renders and server requests on intermediate keystrokes.
3. **Optimistic Form Submissions**: `ApplyForm.jsx` uses React 19 `useActionState` and pending indicators to provide instant user feedback without screen freezing.
