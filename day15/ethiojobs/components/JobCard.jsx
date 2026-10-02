"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function JobCard({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ethiojobs_saved") || "[]");
      setIsSaved(saved.includes(job.id));
    } catch {
      // ignore
    }
  }, [job.id]);

  const toggleSave = (e) => {
    e.preventDefault();
    try {
      const saved = JSON.parse(localStorage.getItem("ethiojobs_saved") || "[]");
      const next = saved.includes(job.id)
        ? saved.filter((id) => id !== job.id)
        : [...saved, job.id];
      localStorage.setItem("ethiojobs_saved", JSON.stringify(next));
      setIsSaved(!isSaved);
    } catch {
      // ignore
    }
  };

  const excerpt = job.description.length > 130
    ? `${job.description.slice(0, 130)}...`
    : job.description;

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div>
          <Link href={`/jobs/${job.id}`} className="job-card-title">
            {job.title}
          </Link>
          <p className="job-card-company">
            {job.company} &mdash; {job.location}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleSave}
          className={`save-btn${isSaved ? " saved" : ""}`}
          aria-label={isSaved ? "Remove from saved jobs" : "Save this job"}
        >
          {isSaved ? "saved" : "save"}
        </button>
      </div>

      <div className="job-card-tags">
        <span className="tag">{job.type}</span>
        <span className="tag tag-accent">{job.category}</span>
        <span className="tag tag-salary">{job.salary}</span>
      </div>

      <p className="job-card-excerpt">{excerpt}</p>

      <div className="job-card-footer">
        <span className="job-card-date">{job.postedAt}</span>
        <Link href={`/jobs/${job.id}`} className="btn btn-ghost">
          View job
        </Link>
      </div>
    </article>
  );
}
