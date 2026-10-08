import { dishes } from "./data/dishes";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats-six.vercel.app";

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/order-status`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5,
    },
  ];

  const dishRoutes = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dishRoutes];
}
