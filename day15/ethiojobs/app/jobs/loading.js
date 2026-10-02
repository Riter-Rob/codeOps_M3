export default function JobsLoading() {
  return (
    <div className="skeleton-list">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-bar wide" />
          <div className="skeleton-bar mid" />
          <div className="skeleton-bar narrow" />
        </div>
      ))}
    </div>
  );
}
