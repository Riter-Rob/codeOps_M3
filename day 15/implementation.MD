Yes — **EthioJobs** is a better practice project if your goal is to become strong with Next.js.

We can make it similar to the Addis Eats assignment, but turn it into a **job marketplace**.

### 🇪🇹 EthioJobs

```text
EthioJobs
│
├── Home
├── Jobs
│   ├── Categories
│   └── Job Details
├── Companies
│   └── Company Details
├── Saved Jobs
├── Applications
└── Post a Job
```

### Main routes

```text
/
 /jobs
 /jobs/[id]
 /companies
 /companies/[id]
 /saved
 /applications
 /post-job
```

For example:

```text
/jobs
```

could display:

```text
EthioJobs

Search jobs...
[ Addis Ababa ▼ ]

────────────────────────────

Frontend Developer
Riter-Rob Technology
Addis Ababa
Full-time

[View Job]

────────────────────────────

Backend Developer
Riter-Rob Solutions
Remote
Full-time

[View Job]
```

Clicking **View Job**:

```text
/jobs/15
```

would show:

```text
Frontend Developer

Riter-Rob Technology
Addis Ababa
Full-time
Salary: 25,000 - 40,000 ETB

Description
...

Requirements
• React
• Next.js
• JavaScript
• Git

[Apply Now]
```

### The Next.js concepts you'll practice

| Concept                  | EthioJobs implementation    |
| ------------------------ | --------------------------- |
| App Router               | `/jobs`, `/companies`, etc. |
| Dynamic route            | `/jobs/[id]`                |
| Nested layout            | Jobs sidebar/categories     |
| Server Component         | Job listing                 |
| Client Component         | Search/filter/save buttons  |
| Server data fetching     | Fetch jobs                  |
| Server Action            | Apply for a job             |
| Route Handler            | `/api/jobs`                 |
| Form validation          | Job application             |
| `loading.js`             | Loading jobs                |
| `error.js`               | Job loading errors          |
| `not-found.js`           | Job doesn't exist           |
| `generateStaticParams()` | Pre-render selected jobs    |

The important part is that we **don't just copy Addis Eats and rename things**. For example, the cart in Addis Eats requires client-side state because it is interactive. 

For EthioJobs, we'd introduce different problems:

```text
Search
   ↓
Filter
   ↓
Job listing
   ↓
Dynamic job page
   ↓
Apply
   ↓
Server Action
   ↓
Validation
   ↓
Application
```

That will force you to understand the architecture rather than memorize the Addis Eats solution.

### Recommended project structure

```text
ethiojobs/
│
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── not-found.js
│   ├── actions.js
│   │
│   ├── jobs/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── loading.js
│   │   ├── error.js
│   │   └── [id]/
│   │       └── page.js
│   │
│   ├── companies/
│   │   ├── page.js
│   │   └── [id]/
│   │       └── page.js
│   │
│   ├── applications/
│   │   └── page.js
│   │
│   ├── post-job/
│   │   └── page.js
│   │
│   └── api/
│       ├── jobs/
│       │   └── route.js
│       └── applications/
│           └── route.js
│
├── components/
│   ├── JobCard.jsx
│   ├── JobSearch.jsx
│   ├── JobFilters.jsx
│   └── ApplyForm.jsx
│
├── lib/
│   ├── jobs.js
│   └── companies.js
│
├── public/
│
├── BOUNDARY.md
├── STRATEGY.md
└── README.md
```

And I suggest we build it **like a real assignment**: I give you **Step 1**, you implement it, show me your code/result