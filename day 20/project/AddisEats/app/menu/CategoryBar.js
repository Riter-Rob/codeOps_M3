export default function CategoryBar() {
  return (
    <div className="category-tabs" aria-label="Menu categories">
      <button type="button" className="category-tab active">All Specialties</button>
      <button type="button" className="category-tab">Traditional Wats</button>
      <button type="button" className="category-tab">Sizzling Tibs</button>
      <button type="button" className="category-tab">Vegan Platters</button>
      <button type="button" className="category-tab">Beverages & Tej</button>
    </div>
  );
}