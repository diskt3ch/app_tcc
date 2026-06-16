---
name: Raízes do Nordeste
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5a4139'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8e7067'
  outline-variant: '#e2bfb4'
  surface-tint: '#aa3600'
  primary: '#a63500'
  on-primary: '#ffffff'
  primary-container: '#d04501'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59c'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#904917'
  on-tertiary: '#ffffff'
  tertiary-container: '#ae602d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822800'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68c'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#753401'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  touch-target: 48px
  kiosk-gutter: 32px
---

## Brand & Style
This design system bridges the warmth of traditional Northeastern Brazilian culture with the precision of modern food-service technology. The system operates on a unified architectural framework:

1.  **Customer-Facing (Cultura):** A "Modern Regionalist" aesthetic. It utilizes heavy whitespace, organic warmth, and vibrant accents to evoke sunlight and earth. It is approachable, hospitable, and high-energy.
2.  **Managerial (Operação):** A "Design Clean e Moderno" aesthetic. Aligned with the global design, it uses light, clean surfaces with warm accents to keep the information readable, elegant, and modern.

The brand personality is resilient, vibrant, and efficient, prioritizing visual cleanliness and responsiveness.

## Colors
The palette is unified for both customers and managers:

### Main Colors (Light/Warm)
*   **Primary (Terracotta):** `#a63500` - Used for primary actions, active states, and brand presence.
*   **Secondary (Bronze/Yellow):** `#7c5800` - Used for highlights and secondary metrics.
*   **Background (Bone):** `#fcf9f8` - A warm, low-glare light surface.
*   **Surface (White/Light):** `#ffffff` / `#f6f3f2` - For clean cards, containers, and table layouts.

## Typography
The system uses a tri-font strategy to differentiate brand character, readability, and technical data.

*   **Headlines:** **Bricolage Grotesque** provides a quirky, rhythmic, and wood-cut feel that mirrors Northeastern craft. Use for menu items and section headers.
*   **Body:** **Be Vietnam Pro** offers high legibility and a contemporary humanist touch for descriptions and navigation.
*   **Data/Admin:** **JetBrains Mono** is reserved for order IDs and timestamps to ensure character distinction in list views.

## Layout & Spacing
The layout logic shifts based on the density requirements:

### Customer App & Kiosk (Low Density)
*   **Grid:** 4-column fluid for mobile; 12-column fixed for Kiosks.
*   **Touch Targets:** Minimum 56px height for all interactive elements to accommodate fast-paced ordering.
*   **Padding:** Generous `lg` (40px) vertical spacing between food categories.

### Managerial Dashboard (High Density)
*   **Grid:** 12-column fluid.
*   **Density:** Compact spacing (`sm` - 12px) to maximize information density on one screen. 
*   **Reflow:** Admin panels use a clean grid layout to keep order lists and metrics cards clearly readable.

## Elevation & Depth
*   Uses **Ambient Shadows** and **Clean Borders**. Elements have soft, warm-tinted shadows or 1px subtle borders (like `border-surface-container-high`) to feel clean and structured. No dark interfaces or neon accents.

## Shapes
*   **Standard Radius:** 0.5rem (8px). This is the default for buttons, cards, and input fields.
*   **Large Radius:** 1.5rem (24px). Reserved for top-level containers in the Customer App.

## Components

### Buttons
*   **Customer:** Large, filled Terracotta buttons with white text. 24px internal padding.
*   **Admin:** Large, filled Terracotta buttons or clean outlined buttons using the primary colors.

### Cards
*   **Product Card (Customer):** Image-led, with the price floating in a Sun Yellow circle.
*   **Order Card (Admin):** Clean card with light background, clear border, and text labels.

### Input Fields
*   **Customer:** Inset fields with a warm-gray border and 16px padding.
*   **Admin:** Inset fields with a light-gray border.

### Lists
*   **Admin Dashboard:** Alternating row colors (zebra striping) using `#ffffff` and `#fbfaf9` for maximum scanability.