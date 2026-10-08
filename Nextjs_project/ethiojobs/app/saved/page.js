"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import JobCard from "../../components/JobCard";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      try {
        const savedIds = JSON.parse(localStorage.getItem("ethiojobs_saved") || "[]");
        if (savedIds.length === 0) {
          setLoading(false);
          return;
        }
        const res = await fetch("/api/jobs");
        const allJobs = await res.json();
        setSavedJobs(allJobs.filter((job) => savedIds.includes(job.id)));
      } catch {
        setSavedJobs([]);
      } finally {
        setLoading(false);
      }
    }
    loadSaved();
  }, []);

  return (
    <div className="saved-shell">
      <div className="section-head">
        <h1 style={{ fontSize: "1.7rem", fontWeight: 400 }}>Saved jobs</h1>
      </div>
      <p style={{ color: "#5a5a54", fontSize: "0.88rem", marginBottom: "1.75rem" }}>
        Roles you bookmarked for later review.
      </p>

      {loading ? (
        <div className="skeleton-list">
          <div className="skeleton-item"><div className="skeleton-bar wide" /></div>
          <div className="skeleton-item"><div className="skeleton-bar mid" /></div>
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="empty-state">
          <h3>No saved jobs</h3>
          <p>
            Hit &ldquo;save&rdquo; on any job card to bookmark it. Saves are stored locally in your browser.
          </p>
          <Link href="/jobs" className="btn btn-primary">Browse jobs</Link>
        </div>
      ) : (
        <div className="job-list">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
