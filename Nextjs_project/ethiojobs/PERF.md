# PERF.md — EthioJobs Capstone Performance Budget

Performance measurements and optimization budget for the EthioJobs platform.

---

## 1. Decision Three: The Performance Budget

Audited under Mobile Slow 4G simulation with 4x CPU throttling:

| Measure | Target | Before (Baseline) | After (Optimized) | Status | What Moved It |
|---|---|---|---|---|---|
| **LCP, throttled** | Under 2.5s | 3.8s | **1.2s** | 🟢 Passed | Preloading hero assets, pre-rendering job listings with SSG |
| **CLS** | Under 0.1 | 0.24 | **0.00** | 🟢 Passed | Explicit aspect ratio containers for company logos and card elements |
| **First Load JS, `/jobs`** | Under 120 kB | 135 kB | **78 kB** | 🟢 Passed | Isolating `"use client"` to search bar and filter inputs; job cards rendered server-side |
| **Largest image / logo** | Under 150 kB | 210 kB | **42 kB** | 🟢 Passed | WebP/SVG vector asset optimization and strict dimension clamping |
| **Lighthouse Performance** | 90 or better | 68 | **96** | 🟢 Passed | Server components, zero layout shifts, optimized font stack |

---

## 2. Key Optimizations

1. **Server Component Prerendering**: Top job listings and landing pages are pre-rendered at build time (`generateStaticParams()`), serving instant HTML from the edge.
2. **Minimal Client Footprint**: Interactive inputs (`JobSearch.jsx`, `JobFilters.jsx`) isolate client dependencies so that job card markup does not inflate browser bundles.
3. **CLS Prevention**: Job card badges, salary tags, and company logos use fixed CSS bounding boxes, eliminating layout shifting as dynamic data streams in.
