import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <span>404</span>
      <h1>Page not found</h1>
      <p>
        That vacancy or page may have expired or been moved to a different address.
      </p>
      <Link href="/jobs" className="btn btn-primary">
        Browse active jobs
      </Link>
    </div>
  );
}
