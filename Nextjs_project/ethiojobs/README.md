# 🇪🇹 EthioJobs - Next.js Job Marketplace

A modern Ethiopian job board built with Next.js App Router, demonstrating Server and Client Components, Server Actions, Dynamic Routes, and Route Handlers.

---

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Routes

| URL | File | Description | Strategy |
|---|---|---|---|
| `/` | `app/page.js` | Landing page with featured jobs & companies | Static (SSG) |
| `/jobs` | `app/jobs/page.js` | Job listings with search & category filters | Dynamic (searchParams) |
| `/jobs/[id]` | `app/jobs/[id]/page.js` | Job details & application form | Static (SSG via `generateStaticParams`) |
| `/companies` | `app/companies/page.js` | Companies directory | Static (SSG) |
| `/companies/[id]` | `app/companies/[id]/page.js` | Company profile & open vacancies | Dynamic |
| `/saved` | `app/saved/page.js` | Saved / bookmarked jobs | Client (`localStorage`) |
| `/applications` | `app/applications/page.js` | Submitted applications tracker | Dynamic |
| `/post-job` | `app/post-job/page.js` | Form to publish new vacancy | Server Action |

---

## Next.js Concepts Practiced

- **App Router**: File-based nested routing (`/jobs`, `/companies`, `/post-job`).
- **Dynamic Route**: `/jobs/[id]` and `/companies/[id]`.
- **Nested Layout**: `app/jobs/layout.js` providing a persistent categories sidebar.
- **Server Components**: Jobs listing, company details, applications, and home page.
- **Client Components**: `JobSearch.jsx`, `JobFilters.jsx`, `JobCard.jsx`, `ApplyForm.jsx`.
- **Server Actions**: `applyJob` and `postJob` with `revalidatePath` and validation error handling in `app/actions.js`.
- **Route Handlers**: `/api/jobs` and `/api/applications`.
- **Form Validation**: Validates name, Ethiopian phone number (TeleBirr), and email before submitting.
- **Streaming & Error Boundaries**: `loading.js` and `error.js` in `/jobs`.
- **`generateStaticParams()`**: Pre-renders top jobs at build time.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | Returns filtered/all jobs |
| `GET` | `/api/applications` | Returns submitted applications |
