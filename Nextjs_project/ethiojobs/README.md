# 🇪🇹 EthioJobs — Next.js Job Marketplace (Capstone)

**IBT College Canada · CodeOps · Full Stack Software Development**  
**Module 3 · Capstone Project · Leveled for Week 9**  
**Deployed URL**: [https://ethiojobs-eta.vercel.app](https://ethiojobs-eta.vercel.app)

---

## 1. Six-Row Standard Status (Week 9 Leveling)

| Row | Requirement | Status | Architecture & Documentation |
|---|---|---|---|
| **1** | Every route reachable on Next.js | ✅ Complete | `/`, `/jobs`, `/jobs/[id]`, `/companies`, `/companies/[id]`, `/saved`, `/applications`, `/post-job` |
| **2** | Layouts and rendering strategy chosen | ✅ Complete | Root shell, persistent category sidebar in `app/jobs/layout.js`, SSG via `generateStaticParams()` ([STRATEGY.md](STRATEGY.md)) |
| **3** | Server and client boundary documented | ✅ Complete | Client interactive leaves (`JobSearch`, `JobFilters`, `ApplyForm`), pure async server components for listings ([BOUNDARY.md](BOUNDARY.md)) |
| **4** | Sign-in and protected routes | ✅ Complete | Three-layer protection for `/applications` and `/post-job`, RBAC for recruiters ([AUTH.md](AUTH.md)) |
| **5** | One measured optimisation pass | ✅ Complete | Throttled Mobile LCP: 1.2s, CLS: 0.00, JS bundle: 78 kB, Lighthouse: 96 ([PERF.md](PERF.md)) |
| **6** | Metadata on every route | ✅ Complete | Dynamic metadata, title templates, SEO descriptions, and sitemap generation ([DATA.md](DATA.md)) |

---

## 2. Core Capstone Documents

- **[AUTH.md](AUTH.md)**: Route protection matrix, layer-by-layer proofs, and threat defenses against unauthorized applications and vacancies.
- **[DATA.md](DATA.md)**: Data fetching boundaries, debounced search synchronization, and SSG pre-rendering strategy.
- **[PERF.md](PERF.md)**: Core Web Vitals audit, before/after budget comparison, and asset optimization breakdown.
- **[BOUNDARY.md](BOUNDARY.md)**: Component boundary matrix separating server data and client interactivity.
- **[STRATEGY.md](STRATEGY.md)**: Route rendering strategies (SSG, ISR, Dynamic).

---

## 3. Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build and test production bundle
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Routes Inventory

| URL | File | Description | Strategy |
|---|---|---|---|
| `/` | `app/page.js` | Landing page with featured jobs & companies | Static (SSG) |
| `/jobs` | `app/jobs/page.js` | Job listings with search & category filters | Dynamic (searchParams) |
| `/jobs/[id]` | `app/jobs/[id]/page.js` | Job details & application form | Static (SSG via `generateStaticParams`) |
| `/companies` | `app/companies/page.js` | Companies directory | Static (SSG) |
| `/companies/[id]` | `app/companies/[id]/page.js` | Company profile & open vacancies | Dynamic |
| `/saved` | `app/saved/page.js` | Saved / bookmarked jobs | Client (`localStorage`) |
| `/applications` | `app/applications/page.js` | Submitted applications tracker (Protected) | Dynamic (Scoped) |
| `/post-job` | `app/post-job/page.js` | Form to publish new vacancy (Recruiter only) | Server Action |
