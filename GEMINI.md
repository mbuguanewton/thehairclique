# The Hair Clique - Project Context

## Project Overview

**The Hair Clique** is a premium hair sanctuary specializing in high-end wig promotion and styling. The platform also offers professional hair dressing services for kids as a secondary bespoke offering, providing both studio and home-based services.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4, CSS Variables, Shadcn UI
- **CMS:** Sanity CMS (Headless) with Table Support
- **Icons:** Lucide React
- **Language:** TypeScript
- **Package Manager:** pnpm

## Architecture & Key Directories

- `src/app/(site)`: Main customer-facing application routes, including `/blog/[slug]` for stories.
- `src/app/(studio)`: Sanity Studio configuration for content management.
- `src/components/ui`: Reusable UI components. Now includes core typography components (`Heading`, `Text`).
- `src/components/blocks`: Dynamic page sections rendered from Sanity content.
- `src/components/layout`: Global layout components like Navbar and Footer.
- `src/components/CustomPortableText.tsx`: Standardized rendering for Sanity Rich Text, including table support.
- `src/sanity/schema`: Sanity content schemas. Now includes blog and site settings.
- `src/sanity/lib`: Sanity client and utility functions.

## Styling Guide

The project follows a modern, high-contrast design system using Tailwind CSS 4:

- **Color System:** Uses CSS variables with `oklch` values for better color consistency.
  - `primary`: Teal-based (`oklch(0.4 0.18 190)`)
  - `accent`: Pinkish-orange (`oklch(0.85 0.08 10)`)
  - `background`: Light mint/white (`oklch(0.98 0.01 190)`)
- **Typography:**
  - Uses `Inter` as the primary sans-serif font.
  - Centralized via `Heading` (variants: `h1`-`h6`, `hero`) and `Text` (variants: `default`, `muted`, `brand-secondary`) components.
- **Design Principles:**
  - Premium, minimalist aesthetic.
  - High contrast for readability.
  - Smooth micro-animations and transitions.
- **Icons:** Standardized on `lucide-react`.

## Data Model (Sanity Schemas)

The project uses a block-based architecture and a dedicated blog system:

- **Main Documents:**
  - `Page`: Dynamic pages built with blocks.
  - `Post`: Individual blog stories with categories and read time calculation.
  - `Site Settings`: Global configuration for the site.
- **Blocks:**
  - `HeroBlock`: Main landing section with CTA.
  - `SimpleHeroBlock`: Minimalist hero for secondary pages.
  - `ServicesBlock`: Displays available hair services.
  - `FeaturesBlock`: Highlights key selling points.
  - `ImageWithTextBlock`: Side-by-side content layouts.
  - `RichTextBlock`: Portable Text content with table support.
  - `ShowcaseBlock`: Gallery or featured work display.
  - `BlogListBlock`: Dynamic feed of recent stories.

## Development Workflow

- **Start Dev Server:** `pnpm dev`
- **Build Project:** `pnpm build`
- **Linting:** `pnpm lint`
- **Sanity Studio:** Accessible at `/studio`. Uses a customized structure for better content management.

---

_Created for use across AI platforms and collaborative tools._
