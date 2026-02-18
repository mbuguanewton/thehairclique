# The Hair Clique - Project Context

## Project Overview

**The Hair Clique** is a premium hair sanctuary specializing in high-end wig promotion and styling. The platform also offers professional hair dressing services for kids as a secondary bespoke offering, providing both studio and home-based services.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4, CSS Variables, Shadcn UI
- **CMS:** Sanity CMS (Headless)
- **Icons:** Lucide React
- **Language:** TypeScript
- **Package Manager:** pnpm

## Architecture & Key Directories

- `src/app/(site)`: Main customer-facing application routes.
- `src/app/(studio)`: Sanity Studio configuration for content management.
- `src/components/ui`: Reusable UI components (buttons, inputs, etc.) based on Shadcn UI.
- `src/components/blocks`: Dynamic page sections rendered from Sanity content (Hero, Services, Features, etc.).
- `src/components/layout`: Global layout components like Navbar and Footer.
- `src/sanity/schema`: Sanity content schemas defining the structure for pages and blocks.
- `src/sanity/lib`: Sanity client and utility functions.

## Styling Guide

The project follows a modern, high-contrast design system using Tailwind CSS 4:

- **Color System:** Uses CSS variables with `oklch` values for better color consistency and perceptually uniform transitions.
  - `primary`: Teal-based (`oklch(0.4 0.18 190)`)
  - `accent`: Pinkish-orange (`oklch(0.85 0.08 10)`)
  - `background`: Light mint/white (`oklch(0.98 0.01 190)`)
- **Typography:** Uses `Inter` as the primary sans-serif font and `Geist` for UI elements.
- **Design Principles:**
  - Premium, kid-friendly aesthetic.
  - High contrast for readability.
  - Smooth micro-animations (e.g., hover effects, transitions).
- **Icons:** Standardized on `lucide-react`.
- **Components:** Built on top of `Shadcn UI` for accessibility and consistency.

## Data Model (Sanity Schemas)

The project uses a block-based architecture for dynamic page building:

- **Page Schema:** Defines pages with a dynamic `blocks` array.
- **Blocks:**
  - `HeroBlock`: Main landing section with CTA.
  - `ServicesBlock`: Displays available hair services.
  - `FeaturesBlock`: Highlights key selling points.
  - `ImageWithTextBlock`: Side-by-side content layouts.
  - `RichTextBlock`: Portable Text content.
  - `ShowcaseBlock`: Gallery or featured work display.

## Development Workflow

- **Start Dev Server:** `pnpm dev`
- **Build Project:** `pnpm build`
- **Linting:** `pnpm lint`
- **Sanity Studio:** Accessible at `/studio` locally during development.

---

_Created for use across AI platforms and collaborative tools._
