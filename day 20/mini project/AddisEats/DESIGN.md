# Addis Eats — Design System (DESIGN.md)
*Inspired by VoltAgent/awesome-design-md architecture*

## 1. Visual Theme & Atmosphere

Addis Eats is a culinary application for traditional Ethiopian dining in Addis Ababa. Rather than looking like a generic AI-generated SaaS dashboard or template, the design draws directly from physical Ethiopian culinary culture: warm earthen tones, handmade teff injera textures, fresh berbere spices, and local neighborhood warmth.

The canvas sits on a rich **Cream** (`#f3e8cc`), evoking warm linen and natural surfaces. Deep **Forest Green** (`#18542a`) grounds the brand identity and typography with quiet confidence. **Tomato Burst** (`#d52518`) commands primary actions and price callouts, while **Sunshine** (`#ffc926`) and **Crisp Carrot** (`#f96015`) provide lively warmth.

###  The Zero-Badge Policy (Human vs. AI Design)
One of the clearest signals of generic AI-generated templates is the excessive use of rounded pill badges, colored tag chips, and status bubbles across every card and header. In Addis Eats:
- **No pill badges or tags allowed.** Every item card is clean and unencumbered.
- Dietary designations (such as fasting or meat categories) are displayed as understated, elegant typographic notes (e.g. *የጾም · Fasting* in muted italic serif text) directly beside or below dish names.
- Order and kitchen statuses are rendered as clear, dignified text labels with subtle color accents (e.g. `Status: Preparing`), avoiding chunky badge pill wrappers.
- Account roles are indicated in understated parenthetical notation `(customer)` or `(staff)`.

### Key Characteristics
- **Typography:** Modern vibe-coded typography pairing **Plus Jakarta Sans** (geometric neo-grotesque with tight tracking) for UI/body/forms and **Playfair Display** (editorial display serif) for curated culinary presence, with **JetBrains Mono** / tabular numerals for pricing and order receipts.
- **Aside Navigation:** Strict `border: none !important;` and `box-shadow: none !important;`. The category sidebar blends naturally into the page hierarchy without artificial box borders.
- **Card Radii & Elevation:** Organic 16px card border-radius (`--radius-card: 16px`) with gentle overflow clipping, warm border lines (`#e5dcc3`), and soft atmospheric depth.
- **Micro-Interactions & UX:** Smooth 4px card lift on hover, subtle 1.035x dish photo zoom, tactile pill buttons (`--radius-pill: 9999px`), and a real-time kitchen beacon pulse on live order status.

---

## 2. Color Palette & Roles

### Brand Colors
- **Cream (`#f3e8cc`)**: The universal page background canvas.
- **Forest Green (`#18542a`)**: Primary brand color. Used for the site brand title, `h1`–`h3` headings, breadcrumbs, and primary text accents.
- **Tomato Burst (`#d52518`)**: Primary action CTA color (Cart pill, Checkout button, Sign In, Order actions) and dish price typography.
- **Crisp Carrot (`#f96015`)**: Warm accent color used for interactive focus rings (`:focus-visible`), input borders on focus, and card hover borders.
- **Sunshine (`#ffc926`)**: Active category filter pill background (`All Dishes`), warning/preparing text indicator.
- **Kiwi (`#9abc05`)**: Delivered status accent and fasting text highlight.

### Surfaces & Neutrals
- **Card Surface (`#ffffff`)**: Clean white container background for food items, order tickets, and forms.
- **Border Line (`#e5dcc3`)**: Warm, low-contrast border line that separates elements naturally on Cream.
- **Input Border (`#d5cdb5`)**: Subtle neutral border for form inputs and inactive category buttons.
- **Text Main (`#1f2937`)**: High-contrast body text for comfortable readability.
- **Text Muted (`#6b7280`)**: Secondary metadata, timestamps, and ingredient descriptions.

---

## 3. Typography Rules

### Font Families
- **Primary Sans (UI & Body):** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Editorial Display (Brand & Headings):** `'Playfair Display', Georgia, serif`
- **Monospace & Receipts:** `'JetBrains Mono', ui-monospace, monospace`
- **Vibe-Coded Letter Spacing:**
  - Brand title: `-0.03em`
  - H1 Headings: `-0.025em`
  - H2 Headings: `-0.02em`
  - H3 Headings: `-0.015em`
  - Body & UI: `-0.011em`

### Typographic Scale
| Role | Size | Weight | Tracking | Color |
|---|---|---|---|---|
| Brand Title | 1.45rem | 800 | -0.03em | Forest Green (`#18542a`) |
| Page Heading (H1) | 1.85rem | 800 | -0.025em | Forest Green (`#18542a`) |
| Section Heading (H2) | 1.3rem | 700 | -0.02em | Forest Green (`#18542a`) |
| Subsection (H3) | 1.1rem | 700 | -0.015em | Forest Green (`#18542a`) |
| Subheading (H3) | 1.1rem | 700 | 1.3 | Forest Green (`#18542a`) |
| Dish Name | 1.1rem | 700 | 1.3 | Forest Green (`#18542a`) |
| Dish Price | 1.0rem | 700 | 1.2 | Tomato Burst (`#d52518`) |
| Body Text | 0.9375rem | 400 | 1.5 | Charcoal (`#4b5563`) |
| Dietary Annotation | 0.8125rem | 400 (italic) | 1.4 | Forest Green (`#18542a`) / Muted (`#78716c`) |
| Button Label | 0.9375rem | 600 | 1.25 | White (`#ffffff`) / Forest Green |

---

## 4. Component Patterns

### 1. Header & Navigation
- Sticky white bar (`#ffffff`) with 2px bottom border (`#e5dcc3`).
- Left: Serif brand mark **Addis Eats** (`#18542a`).
- Right: Navigation items (`Menu`, `Orders`, `Live Status`, `Kitchen`).
- Primary CTA: **Cart** pill in solid Tomato Burst (`#d52518`), white text.

### 2. Sidebar Navigation (`aside`)
- Border is explicitly **none** (`border: none !important; box-shadow: none !important;`).
- Contains category links (`All Dishes`, `Traditional`, `Fasting`, `Tibs`) with active state in Tomato Burst (`#d52518`).
- Integrated `Counter` client component separated by a soft `#f3e8cc` divider line.

### 3. Category Filter Tabs
- Container with flex-wrap pill-like buttons (`.category-btn`).
- Inactive: White surface, `#d5cdb5` border, `#18542a` text.
- Active: Solid Sunshine (`#ffc926`), `#18542a` text, bold weight.

### 4. Food Card (Modern Immersive Design)
- **Geometry & Atmosphere:** High-end dark card body (`#181b20`) with 28px organic corner radius (`border-radius: 28px`), subtle outer border (`rgba(255, 255, 255, 0.08)`), and deep atmospheric drop shadow.
- **Media & Gradient Overlay:** Full-width dish photography (220px height) smoothly fading into the card body through a vertical gradient overlay (`rgba(24, 27, 32, 0)` &rarr; `#181b20`).
- **Floating Controls (Top Bar):**
  - Top-Left: Translucent frosted glass dietary pill badge (`Veg` / category) with `backdrop-filter: blur(12px)`.
  - Top-Right: Circular frosted glass bookmark button (36px circle) with interactive saved state.
- **Typography & Content:**
  - Dish Name: Bold, high-contrast white text (`#ffffff`, 1.35rem, weight 800, tight tracking).
  - Price: Prominently formatted in warm Sunshine gold (`#ffc926`) or tabular numerals.
  - Description: Two-line clamped summary in soft muted silver (`rgba(255, 255, 255, 0.72)`).
- **Primary CTA:** Full-width solid white pill button (`border-radius: 9999px`) labeled **"Add to Cart"** with dark charcoal bold text, subtle lift on hover, and tactile click response.

### 5. Orders & Kitchen Tickets
- Ticket card in white (`#ffffff`) with `#e5dcc3` border.
- Header: Ticket # in Forest Green (`#18542a`).
- Status: Rendered as clean, readable text (`Status: Preparing` in `#b45309`, `Status: Delivered` in `#18542a`, `Status: Cancelled` in `#d52518`).
- Zero status-badge chips or pill wrappers.

---

## 5. Technical Implementation Checklist
- [x] `DESIGN.md` registered in project root.
- [x] Aside element set to `border: none !important;` without artificial borders or radii.
- [x] Vibe-coded typography applied (`Plus Jakarta Sans` + `Playfair Display`).
- [x] Card border-radius increased to organic 16px with smooth hover lift and image zoom.
- [x] Color palette strictly mapped to Cream, Forest Green, Tomato Burst, Crisp Carrot, Sunshine, Kiwi.
- [x] All badges and tag pills removed from the UI.
- [x] SWR real-time updates with live beacon pulse and Server Actions preserved.
- [x] Zero build or lint regressions.
