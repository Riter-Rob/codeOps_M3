import Link from "next/link";

export default function JobsLayout({ children }) {
  return (
    <div className="jobs-shell">
      <aside className="jobs-sidebar">
        <p className="sidebar-heading">Categories</p>
        <ul className="sidebar-links">
          <li><Link href="/jobs">All</Link></li>
          <li><Link href="/jobs?category=Engineering">Engineering &amp; IT</Link></li>
          <li><Link href="/jobs?category=Design">UI / UX Design</Link></li>
          <li><Link href="/jobs?category=Data">Data &amp; Analytics</Link></li>
          <li><Link href="/jobs?category=Marketing">Marketing</Link></li>
        </ul>
        <div className="sidebar-cta">
          <p>Reach thousands of professionals in Ethiopia.</p>
          <Link href="/post-job">Post a vacancy &rarr;</Link>
        </div>
      </aside>
      <section>{children}</section>
    </div>
  );
}
