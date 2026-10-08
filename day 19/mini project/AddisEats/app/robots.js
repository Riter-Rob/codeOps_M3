export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats-six.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/sign-in"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
