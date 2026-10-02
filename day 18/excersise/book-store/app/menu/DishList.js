import Image from "next/image";

async function getDishes() {
  return [
    { id: "1", name: "Shiro", image: "/dishes/shiro.jpg" },
    { id: "2", name: "cake", image: "/dishes/cake.jpg" },
    { id: "3", name: "Pasta", image: "/dishes/pasta.jpg" },
  ];
}

export default async function DishList() {
  const dishes = await getDishes();

  return (
    <div>
      <h2>Available Dishes</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden", background: "#fff" }}>
            <Image
              src={dish.image}
              alt={dish.name}
              width={300}
              height={200}
              sizes="(max-width: 640px) 100vw, 300px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div style={{ padding: "0.75rem" }}>
              <p style={{ fontWeight: "600" }}>{dish.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}