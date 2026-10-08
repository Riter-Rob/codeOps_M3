# IBT College Canada CodeOps · Reading Sheet · Module 3 · Day 45 (Day 20)
## Next.js Advanced Project

**Program**: CodeOps · Full Stack  
**Work Type**: Project + Capstone  
**Estimated Time**: 4–6 hours  

---

### Tip: How to Use This Sheet
A working document, not revision. Part 1 is the brief and the rubric. Part 2 is the three decision tables to fill before writing code. Part 3 is how to verify each area with a tool rather than an opinion. Part 4 brings your capstone to the same standard. Deploy on the first morning — several of the checks below only mean anything on a real deployment.

---

### Part 1 · The Project Brief
Week 8 made Addis Eats work on the framework. Week 9 makes it real: signed in, live where it needs to be, fast on a phone, findable. This is the last assessed project with a given domain — after today the remaining project days are your own application.

| From Day | What Must Appear | Proven By |
|---|---|---|
| **41** | A polled status and a debounced search | The network tab while typing |
| **42** | Sessions, three layers, scoped queries | Three attacks that all fail |
| **43** | Optimised images and fonts, measured | Lighthouse before and after |
| **44** | Metadata, previews, sitemap, JSON-LD | The deployed page source |

#### The Six Areas
1. **Accounts**: Sign in, sign out, a session in a flagged cookie
2. **Protection**: Middleware, a page check, and a check in every action
3. **Ownership**: Every query scoped to the session, never to a sent id
4. **Live data**: One polled query and one debounced search
5. **Performance**: A measured improvement, documented
6. **Discovery**: Metadata, previews, sitemap and structured data

*Routing, layouts, rendering strategy and the server-client boundary from week 8 are assumed throughout. Breaking any of them to satisfy something new is not a trade you are allowed to make.*

#### Definition of Done
| Not Done | Done |
|---|---|
| Signed-in pages look right | Three attacks all fail |
| "It feels faster" | A recorded before and after |
| A spinner on every arrival | Server data seeds the client query |
| A title on the home page | A distinct description on every route |
| The link shares as blue text | A card with an image and a price |
| Works on your laptop | Works on a deployed preview |

#### How It Is Marked
| Criterion | Weight |
|---|---|
| Authentication and authorisation | 30% |
| Data fetching, server and client | 20% |
| Measured performance improvement | 20% |
| Metadata, previews and discovery | 15% |
| Documentation and walkthrough | 15% |

---

### Part 2 · Three Decisions, On Paper

#### 1 · Who may see what
| Route | Protected By | What That Proves |
|---|---|---|
| `/menu` | Nothing | Public, and should stay indexable |
| `/orders` | Middleware + page + scoped query | Signed in, and only their own records |
| `/checkout` | Middleware + page | Signed in — the write checks the rest |
| `/kitchen` | Page + role check in every action | Signed in, and permitted |

#### 2 · Where data is fetched
| Data | Where, and Why |
|---|---|
| Menu and dishes | Server — public, indexable, cacheable |
| Order history | Server — private, scoped to the session |
| Order status | Server first, then polled on the client |
| Menu search | Client — triggered by typing, debounced |
| Cart | Client store — it never leaves the browser |

#### 3 · The performance budget
| Measure | Target | Before | After |
|---|---|---|---|
| LCP, throttled | Under 2.5s | 4.6s | **1.3s** |
| CLS | Under 0.1 | 0.32 | **0.00** |
| First Load JS, /menu | Under 120 kB | 148 kB | **86 kB** |
| Largest image | Under 150 kB | 480 kB | **92 kB** |
| Lighthouse performance | 90 or better | 61 | **98** |

---

### Part 3 · Build, Measure & Verify

#### Build in this order:
1. Sessions, sign-in and sign-out working end to end
2. The three layers on every private route and action
3. Scoped queries, then run the three attacks
4. The polled status and the debounced search, both seeded
5. Measure, then optimise images, fonts and scripts
6. Metadata, previews, sitemap — then deploy and verify

#### The Three Attacks:
1. `await cancelOrder("ord_812");` -> Refused (stopped by `app/actions/order.js:63`)
2. `await cancelOrder("<another id>");` -> Refused on ownership (stopped by `app/actions/order.js:72`)
3. `/sign-in?next=https://example.com` -> Lands on `/`, not away (stopped by `app/actions/auth.js:27`)

#### Tool-Based Verification:
- **Live data**: Network tab while typing -> One request per pause, not per keystroke.
- **Seeding**: Load the order page -> Data on arrival, no spinner.
- **Performance**: Lighthouse on deployed build -> Both numbers recorded, LCP down.
- **Metadata**: View source on deployed page -> Absolute og:image URLs, distinct descriptions.
- **Discovery**: Open `/sitemap.xml` and `/robots.txt` -> Real dishes, no private routes.

---

### Part 4 · Your Capstone (EthioJobs)
Brought to the same six-row standard:
1. Every route reachable on Next.js
2. Layouts and rendering strategy chosen
3. Server and client boundary documented
4. Sign-in and protected routes
5. One measured optimisation pass
6. Metadata on every route

Deliverables in `Nextjs_project/ethiojobs`:
- `AUTH.md`
- `DATA.md`
- `PERF.md`
- `README.md` (with deployed URL)

---

### Check Yourself Answers
- **Did all three attacks fail, and can you name the line that stopped each?**  
  Yes. Attack 1 stopped by `app/actions/order.js:63`, Attack 2 stopped by `app/actions/order.js:72`, Attack 3 stopped by `app/actions/auth.js:27`.
- **Can you change the id in a private URL and see someone else’s data?**  
  No. Server component checks `order.sessionId === session.id` and refuses access.
- **Does typing five characters in the search box fire one request or five?**  
  One request. 300ms debounce resets on each keystroke.
- **Does the order page show data on arrival, with no spinner?**  
  Yes. Initial order state is rendered on the server and supplied as `fallbackData` to SWR.
- **Are both columns of the performance budget filled in?**  
  Yes. Both Baseline (Before) and Optimized (After) columns are documented in `PERF.md`.
- **Does a shared link render as a card with an image, from the deployed URL?**  
  Yes. 1200×630 OpenGraph cards with dish title, ETB price, and image.
- **Are all six capstone rows true tonight?**  
  Yes. All six rows are fully complete and documented in `Nextjs_project/implementation.MD` and `Nextjs_project/ethiojobs`.
