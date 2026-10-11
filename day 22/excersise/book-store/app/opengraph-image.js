import { ImageResponse } from "next/og";

export const alt = "Addis Eats - Authentic Ethiopian Food & Books";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          padding: "40px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "bold", color: "#f59e0b" }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 28, marginTop: 20, color: "#cbd5e1" }}>
          Authentic Ethiopian Cuisine &amp; Cultural Books
        </div>
      </div>
    ),
    { ...size }
  );
}
