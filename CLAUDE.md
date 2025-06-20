# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the production application
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting (via ESLint)

Note: This project uses npm as the package manager.

## Code Formatting and Linting

The project uses Biome for code formatting and linting:
- Formatting: Tab indentation, single quotes for JS/JSX, semicolons as needed
- Run via `npm run lint` or use Biome directly if needed
- Configuration in `biome.json`

## Architecture

This is a Next.js 15 application that aggregates tech trends from multiple sources:

### Core Structure
- **App Router**: Uses Next.js App Router with the `app/` directory
- **Tech Aggregation**: Displays trending articles from Zenn, Qiita, and Hatena Bookmark
- **Feature-based Organization**: Components organized by feature in `app/features/`

### Key Features
- **Filter System**: Context-based filtering between "all", "zenn", "qiita", "hatena" views
- **RSS Integration**: Custom API routes that parse RSS feeds from each platform
- **Responsive Layout**: Grid-based layout that adapts based on selected filter

### Data Flow
1. API routes (`app/api/`) fetch RSS feeds from external sources
2. Client components fetch from these internal APIs
3. Filter context manages which content sections are displayed
4. Each platform has dedicated components for rendering articles

### Component Architecture
- Layout components in `app/components/layouts/` (Header, Footer, Sidebar, MobileMenu)
- Feature components in `app/features/[platform]/components/`
- Shared elements in `app/components/elements/`
- Uses Tailwind Variants (`tv`) for component styling

### API Routes
- `/api/hatena-trends/route.ts` - Fetches Hatena Bookmark IT RSS
- `/api/qiita-trends/route.ts` - Fetches Qiita popular items RSS
- External Zenn API used directly from client components

### Styling
- TailwindCSS with custom configuration
- Uses `tailwind-variants` for component-level styling variants
- Responsive design with mobile-first approach

### State Management
- React Context for filter state (FilterProvider/useFilter)
- No external state management library

### External Dependencies
- `rss-parser` for RSS feed parsing
- `lucide-react` for icons
- `react-aria-components` for accessible UI components

## TypeScript Configuration
- Strict mode enabled
- Path mapping: `@/*` maps to project root
- Target ES2017 for compatibility