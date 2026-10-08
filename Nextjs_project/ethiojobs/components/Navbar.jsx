import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          EthioJobs
        </Link>
        <nav>
          <ul className="navbar-nav">
            <li><Link href="/jobs">Find Jobs</Link></li>
            <li><Link href="/companies">Companies</Link></li>
            <li><Link href="/saved">Saved</Link></li>
            <li><Link href="/applications">Applications</Link></li>
            <li><Link href="/post-job" className="navbar-cta">Post a Job</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
