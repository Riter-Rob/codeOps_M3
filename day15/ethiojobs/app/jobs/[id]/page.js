import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById, initialJobs } from "../../../lib/jobs";
import ApplyForm from "../../../components/ApplyForm";

export async function generateStaticParams() {
  return initialJobs.slice(0, 3).map((job) => ({ id: String(job.id) }));
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) notFound();

  return (
    <div className="job-detail">
      <Link href="/jobs" className="back-link">&larr; All jobs</Link>

      <div className="job-detail-header">
        <h1>{job.title}</h1>
        <p className="job-detail-meta">
          {job.company} &mdash; {job.location}
        </p>
        <div className="job-detail-tags">
          <span className="tag">{job.type}</span>
          <span className="tag tag-accent">{job.category}</span>
          <span className="tag tag-salary">{job.salary}</span>
          <span className="job-detail-posted">{job.postedAt}</span>
        </div>
      </div>

      <div className="job-section">
        <h2>Description</h2>
        <p>{job.description}</p>
      </div>

      {job.requirements?.length > 0 && (
        <div className="job-section">
          <h2>Requirements</h2>
          <ul>
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <ApplyForm jobId={job.id} jobTitle={job.title} />
    </div>
  );
}
