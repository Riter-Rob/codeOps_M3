import { getJobs } from "../../lib/jobs";
import JobCard from "../../components/JobCard";
import JobSearch from "../../components/JobSearch";
import JobFilters from "../../components/JobFilters";
import { Suspense } from "react";

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "All";
  const location = params?.location || "All";

  const jobsList = await getJobs({ search, category, location });

  return (
    <div>
      <h1 style={{ marginBottom: "1.25rem" }}>Jobs in Ethiopia</h1>

      <Suspense fallback={null}>
        <JobSearch />
      </Suspense>

      <Suspense fallback={null}>
        <JobFilters />
      </Suspense>

      <p className="results-count">
        {jobsList.length} {jobsList.length === 1 ? "result" : "results"}
        {search && <> matching &ldquo;{search}&rdquo;</>}
        {category !== "All" && <> in {category}</>}
        {location !== "All" && <> &mdash; {location}</>}
      </p>

      {jobsList.length === 0 ? (
        <div className="empty-state">
          <h3>No jobs found</h3>
          <p>Try adjusting your search or clearing the filters.</p>
        </div>
      ) : (
        <div className="job-list">
          {jobsList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
