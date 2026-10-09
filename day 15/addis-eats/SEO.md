# Making Addis Eats Findable (Day 19 Mini-Project)

Search engine optimization, metadata architecture, dynamic OpenGraph generation, structured data, canonicalization, and crawler directive documentation for Addis Eats.

---

## 1. Production `metadataBase` & Title Template (`app/layout.tsx`)
- In `app/layout.tsx`:
  ```tsx
  export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://addis-eats-six.vercel.app"),
    title: {
      default: "Addis Eats | Authentic Ethiopian Food & Cultural Books",
      template: "%s | Addis Eats",
    },
    description: "Browse and order authentic Ethiopian cuisine and cultural literature with fresh ingredients and traditional spices.",
    openGraph: {
      title: "Addis Eats",
      description: "Authentic Ethiopian cuisine, traditional wat stews, and cultural literature.",
      siteName: "Addis Eats",
      locale: "en_US",
      type: "website",
    },
  };
  ```
- **Why `metadataBase` is set to production URL**:
  Next.js uses `metadataBase` to automatically resolve all relative paths into absolute URLs (e.g. `og:image` tags become `https://addis-eats-six.vercel.app/opengraph-image`). Social scrapers (Facebook, Twitter/X, Discord, WhatsApp) reject relative image paths.
- **Title Template**: Child routes export individual titles like `"Menu & Specialties"`, and Next.js expands them to `"Menu & Specialties | Addis Eats"`.

---

## 2. Distinct, Human-Readable Route Descriptions
Every static route defines a unique, user-oriented description explaining the route purpose:

| Route | Title in Browser Tab | Distinct Meta Description |
|---|---|---|
| `/` | `Home \| Addis Eats` | *"Discover authentic Ethiopian cuisine at Addis Eats. Savor slow-simmered wats, sizzling tibs, and vibrant vegan platters."* |
| `/menu` | `Menu & Specialties \| Addis Eats` | *"Browse our authentic Ethiopian menu featuring traditional stews, grilled specialties, and vegan fasting platters."* |
| `/cart` | `Shopping Cart \| Addis Eats` | *"Review your selected Ethiopian dishes, update order quantities, and proceed to checkout."* |
| `/checkout` | `Secure Checkout \| Addis Eats` | *"Complete your order with secure delivery details and seamless payment."* |
| `/order-status` | `Live Order Status \| Addis Eats` | *"Track real-time cooking progress and estimated delivery times for your Addis Eats meals."* |
| `/orders` | `Order History \| Addis Eats` | *"View your past Addis Eats orders, item receipts, and fulfillment status."* |
| `/sign-in` | `Sign In \| Addis Eats` | *"Sign in to your Addis Eats account to manage orders and track kitchen status."* |
| `/kitchen` | `Kitchen Dashboard \| Addis Eats` | *"Staff portal for monitoring incoming orders and kitchen ticket fulfillment."* |

---

## 3. Dynamic `generateMetadata` for Dishes (`app/menu/[id]/page.js`)
Metadata is derived dynamically from each dish record:
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
    title: `${dish.name} - ${dish.price} ETB`,
    description: dish.summary,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} - ${dish.price} ETB | Addis Eats`,
      description: dish.summary,
      images: [
        {
          url: `/menu/${dish.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dish.name} - Authentic Ethiopian dish at Addis Eats`,
        },
      ],
    },
  };
}
```
- **Different descriptions per dish**:
  - `/menu/1` (Doro Wot): *"Slow-simmered tender chicken leg in rich berbere sauce with hard-boiled egg and seasoned butter."*
  - `/menu/2` (Kitfo): *"Minced prime beef gently warmed with spiced clarified butter and mitmita chili powder."*
  - `/menu/3` (Shiro): *"Creamy slow-cooked chickpea powder stew infused with garlic, ginger, and Ethiopian herbs."*

---

## 4. 1200 × 630 OpenGraph Cards (`ImageResponse`)
Implemented with `@vercel/og` via `next/og`:
1. **Site-wide OpenGraph image (`app/opengraph-image.js`)**:
   - Resolution: 1200 × 630 PNG.
   - Branded banner with site title and cultural subtitle.
2. **Per-dish dynamic OpenGraph image (`app/menu/[id]/opengraph-image.js`)**:
   - Resolution: 1200 × 630 PNG.
   - Highlights the dish name in large typography, the price in ETB, and the culinary summary over a warm backdrop.
   - Previews in group chats and messaging platforms with high visual fidelity.

---

## 5. Schema.org `MenuItem` JSON-LD
In `app/menu/[id]/page.js`:
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
- **Precision alignment**: The dish name, description, and price currency (`ETB`) in JSON-LD precisely match what is rendered in the HTML DOM (`<h1>{dish.name}</h1>` and `{dish.price} ETB`).

---

## 6. Dynamic Sitemap (`app/sitemap.js`) & Crawl Control (`app/robots.js`)
- **`app/sitemap.js`**:
  - Dynamically builds sitemap entries from `dishes` data.
  - Lists public indexable routes: `/`, `/menu`, `/order-status`, and all `/menu/${dish.id}` endpoints.
  - **Excludes private routes**: `/cart`, `/checkout`, `/orders`, `/kitchen`, `/sign-in`.
- **`app/robots.js`**:
  - Directs crawlers to allow public surfaces and disallow private surfaces (`/cart`, `/checkout`, `/orders`, `/kitchen`, `/sign-in`).
  - Points crawlers to `https://addis-eats-six.vercel.app/sitemap.xml`.

---

## 7. Canonical URLs on Query-Bearing Routes
Search engines penalize duplicate content caused by query parameters (e.g. `/menu?category=Vegan&search=shiro`, `/sign-in?next=/checkout`).
Every parameter-bearing route explicitly defines a canonical URL tag via `alternates.canonical`:
- `/menu` -> `rel="canonical" href="https://addis-eats-six.vercel.app/menu"`
- `/order-status` -> `rel="canonical" href="https://addis-eats-six.vercel.app/order-status"`
- `/sign-in` -> `rel="canonical" href="https://addis-eats-six.vercel.app/sign-in"`
- `/menu/[id]` -> `rel="canonical" href="https://addis-eats-six.vercel.app/menu/[id]"`

---

## 8. "Check Yourself" Verification Answers

### 1. Does the page source show absolute URLs in every `og:image` tag?
**Yes.** Because `metadataBase` is set to `https://addis-eats-six.vercel.app` in `app/layout.tsx`, Next.js automatically prefixes all relative image routes. In page source, `<meta property="og:image" content="...">` renders with full absolute URLs (e.g. `https://addis-eats-six.vercel.app/opengraph-image` and `https://addis-eats-six.vercel.app/menu/1/opengraph-image`).

### 2. Do two different dish pages have two different descriptions?
**Yes.** Each dish record in `app/data/dishes.js` defines an authentic culinary summary:
- `/menu/1` (Doro Wat): *"Slow-simmered tender chicken leg in rich berbere sauce with hard-boiled egg and seasoned butter."*
- `/menu/3` (Shiro): *"Creamy slow-cooked chickpea powder stew infused with garlic, ginger, and Ethiopian herbs."*
- `generateMetadata` injects these unique summaries into `<meta name="description">` and `<meta property="og:description">`.

### 3. Does your sitemap contain any route that requires signing in?
**No.** `app/sitemap.js` explicitly excludes private, transactional, and authenticated routes (`/cart`, `/checkout`, `/orders`, `/kitchen`, `/sign-in`). Only public discoverable routes (`/`, `/menu`, `/order-status`, `/menu/[id]`) are enumerated.

### 4. Does the JSON-LD price match the price on the page, in ETB?
**Yes.** Both the visual display and structured data consume the identical `dish.price` property:
- Visual display: `<p>{dish.price} ETB</p>` (e.g. `320 ETB`)
- JSON-LD: `"offers": { "@type": "Offer", "price": 320, "priceCurrency": "ETB" }`

### 5. Is there exactly one `h1` on each page, and does it describe the page?
**Yes.** The site header in `layout.tsx` uses a styled brand element (`<div className="brand">`), leaving `<h1>` exclusively for page-level headings:
- `/`: `<h1>Welcome to Addis Eats</h1>`
- `/menu`: `<h1>Menu</h1>`
- `/menu/[id]`: `<h1>{dish.name}</h1>`
- `/cart`: `<h1>Your Cart</h1>`
- `/checkout`: `<h1>Checkout</h1>`
- `/orders`: `<h1>Orders</h1>`
- `/kitchen`: `<h1>Kitchen Dashboard</h1>`

### 6. Would a link to a dish look worth opening if you saw it in a group chat?
**Yes.** The dynamically generated 1200 × 630 OpenGraph cards display high-contrast typography with the dish name in large bold letters, the price in warm Ethiopian amber (`#f59e0b`), and a concise, appetizing culinary description. Social chat crawlers render a rich link preview card instead of a plain URL snippet.
