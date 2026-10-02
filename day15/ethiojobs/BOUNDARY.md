# EthioJobs - Component Boundary Architecture

| Component | Path | Boundary | Justification |
|---|---|---|---|
| `RootLayout` | `app/layout.js` | **Server** | Renders HTML shell and outer layout; needs no client interactivity. |
| `Navbar` | `components/Navbar.jsx` | **Server** | Pure static navigation links without client state. |
| `HomePage` | `app/page.js` | **Server** | Fetches featured jobs and companies on the server for instant initial paint. |
| `JobsLayout` | `app/jobs/layout.js` | **Server** | Persistent layout shell hosting category navigation sidebar. |
| `JobsPage` | `app/jobs/page.js` | **Server (Async)** | Reads `searchParams` on the server and fetches filtered jobs without client waterfalls. |
| `JobCard` | `components/JobCard.jsx` | **Client** | Uses `localStorage` to save/bookmark jobs on the client. |
| `JobSearch` | `components/JobSearch.jsx` | **Client** | Interactive input form updating URL query params with `useRouter()`. |
| `JobFilters` | `components/JobFilters.jsx` | **Client** | Interactive dropdown selectors updating URL query params with `useRouter()`. |
| `JobsLoading` | `app/jobs/loading.js` | **Server** | Skeleton fallback rendered by Next.js streaming boundary. |
| `JobsError` | `app/jobs/error.js` | **Client** | Next.js requires error boundaries to be Client Components to support `reset()`. |
| `JobDetailPage` | `app/jobs/[id]/page.js` | **Server (Async)** | Statically pre-renders top jobs via `generateStaticParams()`. |
| `ApplyForm` | `components/ApplyForm.jsx` | **Client** | Uses `useActionState` to handle form validation state and submission feedback. |
| `CompaniesPage` | `app/companies/page.js` | **Server** | Fetches companies list on the server. |
| `CompanyDetailPage` | `app/companies/[id]/page.js` | **Server** | Fetches company information and its open vacancies on the server. |
| `SavedJobsPage` | `app/saved/page.js` | **Client** | Reads user's bookmarked job IDs from browser `localStorage`. |
| `ApplicationsPage` | `app/applications/page.js` | **Server** | Renders submitted application records on the server. |
| `PostJobPage` | `app/post-job/page.js` | **Client** | Interactive form shell invoking `postJob` server action. |
