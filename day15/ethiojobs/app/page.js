import Link from "next/link";
import { getJobs } from "../lib/jobs";
import { getCompanies } from "../lib/companies";
import JobCard from "../components/JobCard";

export default async function HomePage() {
  const allJobs = await getJobs();
  const featuredJobs = allJobs.slice(0, 3);
  const companies = await getCompanies();

  return (
    <div>
      <section className="hero">
        <h1>Jobs that are actually hiring right now in Ethiopia</h1>
        <p>Tech, design, and business roles in Addis and remote &mdash; posted by companies that are growing.</p>
        <div className="hero-actions">
          <Link href="/jobs" className="btn btn-primary">Browse all jobs</Link>
          <Link href="/post-job" className="btn btn-ghost">Post a vacancy</Link>
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <div className="section-head">
          <h2>Browse by category</h2>
        </div>
        <div className="cat-strip">
          <Link href="/jobs?category=Engineering">
            <span className="cat-strip-label">Engineering</span>
            <span className="cat-strip-name">3 open roles</span>
          </Link>
          <Link href="/jobs?category=Design">
            <span className="cat-strip-label">Design</span>
            <span className="cat-strip-name">1 open role</span>
          </Link>
          <Link href="/jobs?category=Data">
            <span className="cat-strip-label">Data & Analytics</span>
            <span className="cat-strip-name">1 open role</span>
          </Link>
          <Link href="/jobs?category=Marketing">
            <span className="cat-strip-label">Marketing</span>
            <span className="cat-strip-name">1 open role</span>
          </Link>
        </div>
      </section>

      <section className="job-list">
        <div className="section-head">
          <h2>Recent openings</h2>
          <Link href="/jobs">All {allJobs.length} jobs &rarr;</Link>
        </div>
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <div className="section-head">
          <h2>Companies hiring now</h2>
          <Link href="/companies">All companies &rarr;</Link>
        </div>
        <div className="companies-grid">
          {companies.map((company) => (
            <div key={company.id} className="company-card">
              <h2>
                <Link href={`/companies/${company.id}`}>{company.name}</Link>
              </h2>
              <p className="company-card-sub">{company.location} &bull; {company.industry}</p>
              <p className="company-card-desc">{company.description}</p>
              <div className="company-card-footer">
                <span className="open-roles">
                  {company.openPositions} open {company.openPositions === 1 ? "role" : "roles"}
                </span>
                <Link href={`/companies/${company.id}`} className="btn btn-ghost">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
