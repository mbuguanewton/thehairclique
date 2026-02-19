# The Hair Clique

**The Hair Clique** is a premium hair sanctuary specializing in high-end wig promotion and styling. The platform also offers professional hair dressing services for kids as a secondary bespoke offering, providing both studio and home-based services.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4, CSS Variables, Shadcn UI
- **CMS:** Sanity CMS (Headless) with Table Support
- **Icons:** Lucide React
- **Language:** TypeScript
- **Package Manager:** pnpm

## Development Workflow

### Prerequisites

Make sure you have Node.js and `pnpm` installed.

### Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Content Management (Sanity Studio)

The Sanity Studio is embedded within the project and accessible at `/studio`. It uses a customized structure for better content management.

To deploy or manage Sanity directly via CLI:

```bash
pnpm sanity <command>
```

### Build and Lint

To build the project for production:

```bash
pnpm build
```

To run linting:

```bash
pnpm lint
```

## Architecture

- `src/app/(site)`: Main customer-facing application routes, including `/blog/[slug]` for stories.
- `src/app/(studio)`: Sanity Studio configuration for content management.
- `src/components/ui`: Reusable UI components. Core typography components (`Heading`, `Text`).
- `src/components/blocks`: Dynamic page sections rendered from Sanity content.
- `src/sanity`: Sanity content schemas and clients.
