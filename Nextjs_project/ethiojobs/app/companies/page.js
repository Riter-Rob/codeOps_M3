import Link from "next/link";
import { getCompanies } from "../../lib/companies";

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div style={{ paddingTop: "2rem" }}>
      <div className="section-head">
        <h1 style={{ fontSize: "1.7rem", fontWeight: 400 }}>Companies</h1>
      </div>
      <p style={{ color: "#5a5a54", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
        Top technology companies and employers actively hiring in Ethiopia.
      </p>
      <div className="companies-grid">
        {companies.map((company) => (
          <div key={company.id} className="company-card">
            <h2>
              <Link href={`/companies/${company.id}`}>{company.name}</Link>
            </h2>
            <p className="company-card-sub">
              {company.location} &bull; {company.industry}
            </p>
            <p className="company-card-desc">{company.description}</p>
            <div className="company-card-footer">
              <span className="open-roles">
                {company.openPositions} open {company.openPositions === 1 ? "role" : "roles"}
              </span>
              <Link href={`/companies/${company.id}`} className="btn btn-ghost">
                Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
