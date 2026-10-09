# Addis Eats — Design System (DESIGN.md)
*Inspired by VoltAgent/awesome-design-md architecture*

## 1. Visual Theme & Atmosphere

Addis Eats is an authentic, human-designed culinary application for traditional Ethiopian dining in Addis Ababa. Rather than looking like a generic AI-generated SaaS dashboard or template, the design draws directly from physical Ethiopian culinary culture: warm earthen tones, handmade teff injera textures, fresh berbere spices, and local neighborhood warmth.

The canvas sits on a rich **Cream** (`#f3e8cc`), evoking warm linen and natural surfaces. Deep **Forest Green** (`#18542a`) grounds the brand identity and typography with quiet confidence. **Tomato Burst** (`#d52518`) commands primary actions and price callouts, while **Sunshine** (`#ffc926`) and **Crisp Carrot** (`#f96015`) provide lively warmth.

### 🚫 The Zero-Badge Policy (Human vs. AI Design)
One of the clearest signals of generic AI-generated templates is the excessive use of rounded pill badges, colored tag chips, and status bubbles across every card and header. In Addis Eats:
- **No pill badges or tags allowed.** Every item card is clean and unencumbered.
- Dietary designations (such as fasting or meat categories) are displayed as understated, elegant typographic notes (e.g. *የጾም · Fasting* in muted italic serif text) directly beside or below dish names.
- Order and kitchen statuses are rendered as clear, dignified text labels with subtle color accents (e.g. `Status: Preparing`), avoiding chunky badge pill wrappers.
- Account roles are indicated in understated parenthetical notation `(customer)` or `(staff)`.

### Key Characteristics
- **Typography:** Universal `'Times New Roman', Times, serif` across all headings, body text, buttons, and navigation for an authentic, printed-menu editorial aesthetic.
- **Aside Navigation:** Strict `border: none !important;` and `box-shadow: none !important;`. The category sidebar blends naturally into the page hierarchy without artificial box borders.
- **Clean Elevation:** Restrained borders (`#e5dcc3`) and minimal shadows keep cards flat, honest, and grounded.
- **Micro-Interactions:** Subtle border color shift (`#f96015`) and soft hover lift on food cards without flashy gimmicks.

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

### Font Family
- **Universal Stack:** `'Times New Roman', Times, serif !important`
- Applied across `body`, `h1`, `h2`, `h3`, `button`, `input`, `select`, `textarea`, and `.tabular`.

### Typographic Scale
| Role | Size | Weight | Line Height | Color |
|---|---|---|---|---|
| Brand Title | 1.4rem | 700 | 1.2 | Forest Green (`#18542a`) |
| Page Heading (H1) | 1.85rem | 700 | 1.2 | Forest Green (`#18542a`) |
| Section Heading (H2) | 1.3rem | 700 | 1.3 | Forest Green (`#18542a`) |
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

### 4. Menu Item Card
- Crisp white background (`#ffffff`), 1px `#e5dcc3` border, 6px border radius.
- Real dish photograph (175px height, object-fit cover).
- Header: Dish name in Forest Green + Price in Tomato Burst.
- Dietary note: Understated italic text (`የጾም · Fasting` or category name), **strictly no badge pills**.
- Footer: Teff injera ingredients description + order link.

### 5. Orders & Kitchen Tickets
- Ticket card in white (`#ffffff`) with `#e5dcc3` border.
- Header: Ticket # in Forest Green (`#18542a`).
- Status: Rendered as clean, readable text (`Status: Preparing` in `#b45309`, `Status: Delivered` in `#18542a`, `Status: Cancelled` in `#d52518`).
- Zero status-badge chips or pill wrappers.

---

## 5. Technical Implementation Checklist
- [x] `DESIGN.md` registered in project root.
- [x] Aside element set to `border: none !important;`.
- [x] Font set to `'Times New Roman', Times, serif`.
- [x] Color palette strictly mapped to Cream, Forest Green, Tomato Burst, Crisp Carrot, Sunshine, Kiwi.
- [x] All badges and tag pills removed from the UI.
- [x] SWR real-time updates and Server Actions preserved.
- [x] Zero build or lint regressions.
