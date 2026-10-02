import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompanyById } from "../../../lib/companies";
import { getJobs } from "../../../lib/jobs";
import JobCard from "../../../components/JobCard";

export default async function CompanyDetailPage({ params }) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) notFound();

  const allJobs = await getJobs();
  const companyJobs = allJobs.filter(
    (j) => String(j.companyId) === String(id) ||
      j.company.toLowerCase() === company.name.toLowerCase()
  );

  return (
    <div style={{ paddingTop: "2rem" }}>
      <Link href="/companies" className="back-link">&larr; All companies</Link>

      <div className="job-detail-header">
        <h1>{company.name}</h1>
        <p className="job-detail-meta">
          {company.location} &bull; {company.industry}
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Visit website
          </a>
          <span className="open-roles">
            {company.openPositions} open {company.openPositions === 1 ? "position" : "positions"}
          </span>
        </div>
      </div>

      <div className="job-section">
        <h2>About</h2>
        <p>{company.description}</p>
      </div>

      <div className="job-section">
        <h2>Open vacancies ({companyJobs.length})</h2>
        {companyJobs.length === 0 ? (
          <p style={{ color: "#5a5a54", fontSize: "0.9rem" }}>
            No active listings at the moment.
          </p>
        ) : (
          <div className="job-list">
            {companyJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
