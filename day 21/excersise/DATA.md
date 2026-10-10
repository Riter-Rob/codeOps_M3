# SEO, Metadata & Search Engine Indexing (Day 19)

Notes on setting up global and route-level metadata, dynamic OpenGraph generation with `ImageResponse`, Schema.org structured data, dynamic sitemaps, and robots directives in the Next.js App Router.

---

## 1. Global Metadata & Title Template (`app/layout.tsx`)
In `app/layout.tsx`, root metadata was defined using `metadataBase` and a title template:
```tsx
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Addis Eats | Authentic Ethiopian Food & Books",
    template: "%s | Addis Eats",
  },
  description: "Browse and order authentic Ethiopian cuisine and cultural literature.",
  openGraph: {
    title: "Addis Eats",
    description: "Authentic Ethiopian cuisine and cultural literature.",
    siteName: "Addis Eats",
    locale: "en_US",
    type: "website",
  },
};
```
- **`metadataBase`**: Essential for resolving relative OpenGraph images, canonical URLs, and sitemaps into fully qualified URLs (e.g. `http://localhost:3000/opengraph-image`).
- **`title.template`**: `%s | Addis Eats` automatically formats child page titles (e.g. `Menu & Specialties` becomes `Menu & Specialties | Addis Eats`).
- **`title.default`**: Provides the fallback title for routes that do not define their own.

---

## 2. Static Route Metadata
Every static route was given a human-written, descriptive title and meta description:

- **Home (`/`)**:
  - Title: `Home` (`Home | Addis Eats`)
  - Description: *"Welcome to Addis Eats. Order freshly cooked authentic Ethiopian dishes, stews, and cultural books."*
- **Menu (`/menu`)**:
  - Title: `Menu & Specialties`
  - Description: *"Explore our authentic Ethiopian menu featuring freshly prepared wat stews, grilled tibs, and vegan platters."*
- **Cart (`/cart`)**:
  - Title: `Shopping Cart`
  - Description: *"Review your selected Ethiopian dishes, adjust quantities, and proceed to checkout."*
- **Checkout (`/checkout`)**:
  - Title: `Secure Checkout`
  - Description: *"Provide delivery details and securely complete your Addis Eats order."*
- **Order Status (`/order-status`)**:
  - Title: `Live Order Status`
  - Description: *"Track real-time cooking progress and estimated delivery times for your Addis Eats meals."*
- **Orders (`/orders`)**:
  - Title: `Order History`
  - Description: *"View your past orders, delivery receipts, and current meal preparation details."*
- **Sign In (`/sign-in`)**:
  - Title: `Sign In`
  - Description: *"Sign in to your Addis Eats account to manage orders and track kitchen status."*
- **Kitchen (`/kitchen`)**:
  - Title: `Kitchen Dashboard`
  - Description: *"Staff portal for monitoring incoming orders and kitchen ticket fulfillment."*

---

## 3. Dynamic Metadata on Dish Route (`app/menu/[id]/page.js`)
The dynamic dish route defines `generateMetadata` using the dish's `name`, `price`, and `summary`:
```js
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = dishes.find((d) => String(d.id) === String(id));

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "The requested Ethiopian dish could not be found.",
    };
  }

  return {
    title: `${dish.name} - $${dish.price}`,
    description: dish.summary,
    openGraph: {
      title: `${dish.name} - $${dish.price}`,
      description: dish.summary,
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} at Addis Eats`,
        },
      ],
    },
  };
}
```
- Browsing to `/menu/1` produces the title: `Doro Wat - $320 | Addis Eats`.
- Meta description dynamically reflects the authentic dish summary.

---

## 4. OpenGraph Images with `ImageResponse`
Two OpenGraph generators were implemented using `next/og`:

1. **Site-wide OpenGraph Image (`app/opengraph-image.js`)**:
   - Generates a 1200x630 banner with branding and subtitle.
   - Automatically mapped to `/opengraph-image` and linked in `<head>` via `<meta property="og:image" content="...">`.
2. **Per-Dish OpenGraph Image (`app/menu/[id]/opengraph-image.js`)**:
   - Reads the dynamic route `id` and renders a customized social card with dish name, price in ETB, and summary.
   - Served at `/menu/[id]/opengraph-image` for social sharing previews (Twitter/X, WhatsApp, LinkedIn, iMessage).

---

## 5. Schema.org `MenuItem` JSON-LD Structured Data
In `app/menu/[id]/page.js`, structured data is generated from the exact same `dish` object rendered on the page:
```jsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MenuItem",
  name: dish.name,
  description: dish.summary,
  offers: {
    "@type": "Offer",
    price: dish.price,
    priceCurrency: "ETB",
  },
  image: dish.image,
};

return (
  <div>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    ...
  </div>
);
```
- Enables Google and other search engines to parse rich menu cards, pricing, and food descriptions directly from the HTML source without executing client-side scripts.

---

## 6. Dynamic Sitemap (`app/sitemap.js`)
`app/sitemap.js` generates search-crawlable URLs while explicitly excluding private/authenticated routes:
```js
import { dishes } from "./data/dishes";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/order-status`, lastModified: new Date(), changeFrequency: "always", priority: 0.5 },
  ];

  const dishRoutes = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dishRoutes];
}
```
- **Included**: `/`, `/menu`, `/order-status`, and dynamic `/menu/1` through `/menu/9`.
- **Excluded**: `/cart`, `/checkout`, `/orders`, `/kitchen`, `/sign-in`.

---

## 7. Crawl Directives (`app/robots.js`)
`app/robots.js` prevents crawlers from indexing transactional and private routes, and references the dynamic sitemap:
```js
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/sign-in"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 8. View-Source Verification Checklist
Verified against the running production server source output:
1. `<title>` on `/menu/1` renders as `Doro Wat - $320 | Addis Eats`.
2. `<meta name="description" content="...">` renders with dish summary.
3. `<meta property="og:image" content="http://localhost:3000/menu/1/opengraph-image">` is present.
4. `<script type="application/ld+json">` contains valid `@type: "MenuItem"` markup.
5. `GET /sitemap.xml` responds with XML listing all dishes and omitting private routes.
6. `GET /robots.txt` outputs `Disallow: /cart` and `Disallow: /checkout` pointing to `Sitemap: http://localhost:3000/sitemap.xml`.
