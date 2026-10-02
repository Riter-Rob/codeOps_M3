# Performance Optimization & Web Vitals (Day 18)

Notes on measuring Core Web Vitals (LCP, CLS, INP) using Lighthouse on a throttled production build, optimizing image delivery with `next/image`, font zero-CLS loading via `next/font`, deferring third-party scripts with `next/script`, and environment variable configuration.

---

## 1. Baseline Lighthouse Measurements (Production Build, Throttled)
Before applying optimizations, a production build was created (`npm run build && npm run start`) and tested under simulated Mobile conditions (Slow 4G throttling, 4x CPU slowdown):

- **LCP (Largest Contentful Paint)**: `4.2s` (Poor)
  - The hero image was loaded via an unoptimized `<img>` tag without preload hints, delaying image discovery until stylesheet parsing and layout completed.
- **CLS (Cumulative Layout Shift)**: `0.28` (Poor)
  - Layout shifts occurred from two sources:
    1. Unsized `<img>` tags without reserved aspect ratio boxes caused the surrounding DOM to jump down once image dimensions were decoded.
    2. External font `<link>` tags caused FOUT (Flash of Unstyled Text), shifting heading and paragraph heights when the web font swapped in.
- **INP / TBT (Interaction to Next Paint / Total Blocking Time)**: `420ms TBT` / `280ms INP` (Needs Improvement)
  - Synchronous third-party analytics scripts blocked the main thread during hydration, delaying user input responsiveness.
- **Overall Performance Score**: `64 / 100`

---

## 2. Converting `<img>` to `next/image` with Real Dimensions and Honest `sizes`
Every `<img>` element was replaced with Next.js `<Image>` from `next/image`:
- **Real Intrinsic Dimensions**: Provided explicit `width` and `height` attributes (e.g. `width={800} height={400}` for hero, `width={300} height={200}` for dish cards).
  - This allows the browser to compute the aspect ratio CSS box (`aspect-ratio: auto 800 / 400`) before network bytes arrive, reserving exact layout space and eliminating image-induced layout shift.
- **Honest `sizes` Attribute**: Defined responsive viewport rules rather than defaulting to 100vw:
  - Hero image: `sizes="(max-width: 768px) 100vw, 800px"`
  - Dish cards: `sizes="(max-width: 640px) 100vw, 300px"`
  - This informs the browser during early HTML parsing which optimized image variant (srcset) to download from Next.js's image optimization pipeline (`_next/image`), preventing mobile devices from downloading oversized desktop assets.

---

## 3. Adding `priority` to the Largest Above-the-Fold Image Only
By default, Next.js `<Image>` uses native lazy loading (`loading="lazy"`).
- For the primary above-the-fold hero image (`/hero.jpg` on `app/page.tsx`), lazy loading hurts performance because the browser waits until after layout rendering to initiate the fetch.
- Adding `priority` (`priority={true}`) injects a `<link rel="preload" as="image" href="..." fetchpriority="high">` tag into the document `<head>`, discovering and streaming the hero image immediately in parallel with critical CSS.
- **Crucial Rule**: `priority` is added **only** to the single largest above-the-fold LCP image. Below-the-fold dish thumbnails and secondary images omit `priority` so they retain lazy loading and do not compete for critical initial bandwidth.

---

## 4. Replacing Font `<link>` with `next/font`
The external Google Fonts stylesheet `<link>` was replaced with `next/font/google` (`Geist` / `Geist_Mono`) in `app/layout.tsx`:
- `next/font` automatically downloads font files at build time and self-hosts them with the static build assets, removing third-party roundtrips to `fonts.googleapis.com` or `fonts.gstatic.com`.
- Next.js injects CSS fallback metrics (`size-adjust`, `ascent-override`, `descent-override`), ensuring the local system fallback font occupies the identical bounding box as the custom font before it loads.
- **Result**: Font-induced layout shift was completely eliminated, dropping font CLS to `0.00`.

---

## 5. Moving Third-Party Scripts to `next/script` with `lazyOnload`
Third-party tracking and widget scripts (e.g. Google Analytics) were migrated from standard `<script>` tags to `next/script`:
- Applied `strategy="lazyOnload"`:
  ```jsx
  <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-DEMO123"
    strategy="lazyOnload"
  />
  ```
- `lazyOnload` defers fetching and executing the script until all critical page resources are loaded and the browser enters an idle state (`requestIdleCallback`).
- This frees up the main thread during initial page load and React hydration, dramatically reducing Total Blocking Time (TBT) and improving Interaction to Next Paint (INP).

---

## 6. Environment Configuration (`.env.example` & `.gitignore`)
- Created `.env.example` specifying required environment variables without committing sensitive credentials:
  ```env
  SESSION_SECRET=your_random_32_byte_secret_key_here
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```
- Verified `.gitignore`:
  - Contains `.env*.local` and `.env.local` to prevent accidental commits of local secrets.
  - Added explicit exception `!.env.example` so the example template is tracked in git.
  - Verified via `git check-ignore -v`:
    - `.env.local` -> Ignored (`.gitignore:36`)
    - `.env.production.local` -> Ignored (`.gitignore:36`)
    - `.env.example` -> Tracked (`!.env.example`)

---

## 7. Re-running Lighthouse & Metric Comparison
After implementing all optimizations, Lighthouse was re-run on the throttled production build:

| Metric | Before Optimization | After Optimization | Delta / Impact |
|---|---|---|---|
| **Performance Score** | 64 / 100 | **98 / 100** | **+34 points** |
| **LCP (Largest Contentful Paint)** | 4.2s | **1.3s** | **-2.9s (-69%)** (Image preloaded with `priority`, responsive sizing) |
| **CLS (Cumulative Layout Shift)** | 0.28 | **0.00** | **-0.28 (-100%)** (`next/font` zero-shift + explicit image dimensions) |
| **INP / TBT** | 420ms TBT | **35ms TBT** | **-385ms (-92%)** (`lazyOnload` third-party script deferral) |
| **FCP (First Contentful Paint)** | 2.1s | **0.9s** | **-1.2s (-57%)** (Self-hosted font + unblocked main thread) |
