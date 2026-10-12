---
name: Synthetic Command
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#859399'
  outline-variant: '#3c494e'
  surface-tint: '#4cd6ff'
  primary: '#a4e6ff'
  on-primary: '#003543'
  primary-container: '#00d1ff'
  on-primary-container: '#00566a'
  inverse-primary: '#00677f'
  secondary: '#ffb3ae'
  on-secondary: '#68000b'
  secondary-container: '#a90219'
  on-secondary-container: '#ffb3ad'
  tertiary: '#00fc92'
  on-tertiary: '#00391d'
  tertiary-container: '#00dc7f'
  on-tertiary-container: '#005b31'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b7eaff'
  primary-fixed-dim: '#4cd6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930014'
  tertiary-fixed: '#5bffa1'
  tertiary-fixed-dim: '#00e383'
  on-tertiary-fixed: '#00210e'
  on-tertiary-fixed-variant: '#00522c'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  data-value:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 280px
---

## Brand & Style

The visual identity is defined by a "Tactical Intelligence" aesthetic—a high-fidelity, dark-mode command center designed for rapid geospatial analysis and high-stakes decision-making. The system evokes a sense of omnipresence and precision, utilizing a refined **Glassmorphism** style to layer information without losing environmental context. 

The design narrative focuses on three pillars:
1.  **Immediacy:** High-risk data is surfaced through chromatic urgency (Neon Red).
2.  **Clarity:** Technical typography ensures complex datasets remain legible under pressure.
3.  **Depth:** Semi-transparent surfaces and subtle glows create a multi-dimensional workspace that feels like a futuristic HUD (Heads-Up Display).

The interface should feel like a living organism of data, where every interaction is crisp, responsive, and authoritative.

## Colors

The palette is optimized for low-light environments typical of operations centers. 

- **Primary (Electric Blue):** Used for AI-driven insights, active state indicators, and primary navigation. It represents the "intelligence" layer of the system.
- **Secondary (Neon Red):** Reserved exclusively for high-priority alerts, danger zones, and critical crime markers. It is the highest-priority signal in the UI.
- **Accent (Cyber Green):** Denotes optimized routes, safe zones, and successful system operations.
- **Neutral/Background:** A deep, tiered hierarchy of navies and blacks (#0A0C10 to #010409) provides the "void" upon which data layers are projected.

## Typography

This design system employs a dual-font strategy to balance readability with a technical aesthetic. 

- **Inter** is the primary workhorse, used for headlines and body text to ensure maximum legibility across dense information displays.
- **JetBrains Mono** is utilized for "The Data Layer"—anywhere coordinates, timestamps, crime IDs, or telemetry are shown. This creates a clear visual distinction between interface labels and the raw data being processed.

All type should be rendered with `antialiased` smoothing to maintain sharpness on dark backgrounds.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model for dashboard controls overlaid on a **Fluid Map** background.

- **The Map Layer:** Always occupies the full viewport background.
- **The Intelligence Layer:** Information panels are anchored to the left and right, utilizing a 12-column grid system for internal content.
- **Responsive Behavior:** 
  - **Desktop:** Side panels are fixed with `backdrop-blur`. 
  - **Tablet:** Panels become collapsible drawers.
  - **Mobile:** Single-column layout with a bottom-anchored "Incident Sheet" and a minimized "Alert HUD" at the top.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Luminescent Outlines** rather than traditional shadows.

- **Level 0 (Map):** The base geospatial layer.
- **Level 1 (Panels):** Surface-glass (70% opacity) with a 20px backdrop blur. These feature a 1px border (`border_subtle`).
- **Level 2 (Modals/Popovers):** Higher opacity (85%) with a subtle outer glow using the `primary_color` at 10% opacity to suggest "active" focus.
- **Interaction:** Hovering over interactive elements increases the border opacity and triggers a micro-glow effect, simulating a physical light source within the screen.

## Shapes

The design system uses a "Technical Rounded" language. Standard components like cards and input fields use an **8px (0.5rem)** radius to maintain a modern, professional feel that isn't overly aggressive. 

Large dashboard containers and main sidebars use **16px (1rem)** for a distinct structural look. Small utility elements like status tags or crime markers use a **Pill-shape** to stand out against the predominantly rectangular layout.

## Components

- **Buttons:** Primary buttons are solid `primary_color` with black text. Secondary buttons are ghost-style with `primary_color` borders and text. High-risk actions (e.g., "Dispatch") use a solid `secondary_color` with a subtle pulse animation.
- **Cards (Intelligence Modules):** Built with `surface_glass`. Header sections of cards should have a subtle 1px bottom border.
- **Input Fields:** Darker than the surface (`#010409`), with a `primary_color` glow on focus. Labels should always be in `JetBrains Mono` and all-caps.
- **Chips/Status Tags:** Semi-transparent backgrounds with high-saturation text. For example, a "Critical" alert tag has a 10% red background and 100% red text.
- **Geospatial Markers:** 
  - **Crime Marker:** A diamond shape in `secondary_color`.
  - **AI Prediction Zone:** A hexagonal perimeter in `primary_color` with a low-opacity fill.
- **Data Lists:** Use alternating row opacities for density. Every row should have a `data-label` for its timestamp or ID.