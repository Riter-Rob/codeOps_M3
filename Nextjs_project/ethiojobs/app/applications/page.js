import Link from "next/link";
import { getApplications } from "../../lib/applications";

export default async function ApplicationsPage() {
  const apps = await getApplications();

  return (
    <div style={{ paddingTop: "2rem" }}>
      <div className="section-head">
        <h1 style={{ fontSize: "1.7rem", fontWeight: 400 }}>My applications</h1>
      </div>
      <p style={{ color: "#5a5a54", fontSize: "0.88rem", marginBottom: "1.75rem" }}>
        Submissions made through EthioJobs this session.
      </p>

      {apps.length === 0 ? (
        <div className="empty-state">
          <h3>No applications yet</h3>
          <p>When you apply for a role, your submission will appear here.</p>
          <Link href="/jobs" className="btn btn-primary">Find a job</Link>
        </div>
      ) : (
        <div className="app-list">
          {apps.map((app) => (
            <div key={app.id} className="app-item">
              <div>
                <p className="app-title">{app.jobTitle}</p>
                <p className="app-meta">
                  {app.name} &bull; {app.email} &bull; {app.phone}
                </p>
                {app.notes && (
                  <p className="app-note">&ldquo;{app.notes}&rdquo;</p>
                )}
              </div>
              <span className="status-tag">{app.status}</span>
              <div className="app-footer">
                <span className="job-card-date">Applied {app.appliedAt}</span>
                {app.jobId && (
                  <Link href={`/jobs/${app.jobId}`} className="btn btn-ghost">
                    View job &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
