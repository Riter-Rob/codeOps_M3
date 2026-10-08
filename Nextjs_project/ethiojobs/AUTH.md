# AUTH.md — EthioJobs Capstone Security Architecture

This document defines the authentication model, route guards, ownership checks, and threat models for the EthioJobs platform as part of the Week 9 Capstone leveling requirements.

---

## 1. Decision One: Who May See What

| Route / Action | Who | Protected By | What That Proves |
|---|---|---|---|
| `/` | **Everyone** | None | Public landing page; pre-rendered for search indexability. |
| `/jobs` & `/jobs/[id]` | **Everyone** | None | Public job listings; indexable by search engines and job aggregators. |
| `/companies` & `/companies/[id]` | **Everyone** | None | Public employer directory. |
| `/saved` | **Client Visitor** | Local Storage Boundary | Bookmarked jobs remain strictly on the visitor's device. |
| `/applications` | **Applicant (Owner)** | Middleware + Server Component + Scoped Query | Caller is signed in; queries are scoped strictly to `session.id` (`getApplicationsForUser(session.id)`). |
| `/post-job` | **Employer / Recruiter** | Middleware + Server Component + Action Role Gate | Caller is authenticated and possesses the `"recruiter"` or `"admin"` role before creating vacancies. |
| `applyJob` (Action) | **Applicant** | Action Session Verification | Associates application record with verified applicant session ID. |
| `postJob` (Action) | **Employer** | Action Role & Ownership Check | Re-checks session and recruiter authorization before inserting job records. |

---

## 2. The Three Layers of Protection

1. **Layer 1: Edge Middleware**
   - Intercepts requests targeting `/applications` and `/post-job`.
   - Validates session cookie existence and redirects unauthenticated visitors to `/sign-in?next=/applications` or `/sign-in?next=/post-job`.
   - Strips unsafe external destinations (`startsWith("/") && !startsWith("//")`).

2. **Layer 2: Server Component Verification**
   - Re-verifies `getSession()` within `app/applications/page.js` and `app/post-job/page.js`.
   - Guarantees data cannot leak even if middleware is bypassed.
   - Enforces role checks: `/post-job` requires `session.role === "recruiter"`.

3. **Layer 3: Server Action Ownership & Mutation Gate**
   - Every mutation in `app/actions.js` (`applyJob`, `postJob`) retrieves session from cookies.
   - Verifies ownership and role privileges directly inside the write operation before mutating records.

---

## 3. Threat Model & Attack Defenses

### Attack 1: Calling `postJob` While Anonymous
- **Attack**: Direct POST invocation from DevTools console or curl without session cookie.
- **Defense**: Server action checks `const session = await getSession(); if (!session) return { error: "Unauthorized" };`.

### Attack 2: Cross-Applicant Data Exposure (IDOR)
- **Attack**: Applicant attempts to query another candidate's submitted resumes and phone numbers via `/api/applications` or `/applications?id=...`.
- **Defense**: Query is strictly scoped to `session.id`. Application records are filtered exclusively by `app.applicantId === session.id`.

### Attack 3: Open Redirect Phishing
- **Attack**: Phishing link with `/sign-in?next=https://malicious-site.com`.
- **Defense**: Destination is sanitized using relative URL checks, defaulting to `"/"` for external targets.
