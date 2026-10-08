import { ImageResponse } from "next/og";
import { dishes } from "@/app/data/dishes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => String(d.id) === String(id)) || {
    name: "Ethiopian Dish",
    price: 200,
    summary: "Authentic Ethiopian culinary specialty",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e293b",
          color: "#ffffff",
          padding: "50px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: "bold", color: "#fef3c7" }}>
          {dish.name}
        </div>
        <div style={{ fontSize: 36, marginTop: 16, color: "#f59e0b" }}>
          {dish.price} ETB
        </div>
        <div style={{ fontSize: 24, marginTop: 24, color: "#cbd5e1", maxWidth: 900 }}>
          {dish.summary}
        </div>
        <div style={{ fontSize: 20, marginTop: 32, color: "#94a3b8" }}>
          Addis Eats Menu
        </div>
      </div>
    ),
    { ...size }
  );
}
