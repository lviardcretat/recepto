# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Recepto is a recipe management application built with Nuxt.js, designed for storing and managing large numbers of recipes and ingredients for daily use. It provides features for recipe creation, weekly meal planning, and shopping list generation.

## Common Commands

### Development
- `pnpm dev` - Start development server
- `pnpm dev:remote` - Start development server with remote connection
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm generate` - Generate static site

### Database Operations
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push database schema changes
- `pnpm db:visualizer` - Launch Drizzle Lab visualizer

### Code Quality
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix

### Package Management
- Uses `pnpm` (version 10.12.4) as package manager

## Architecture Overview

### Tech Stack
- **Framework**: Nuxt.js 3 with TypeScript
- **Database**: SQLite with Drizzle ORM
- **Styling**: Tailwind CSS 4 + Nuxt UI
- **Authentication**: Better Auth
- **Deployment**: NuxtHub (Cloudflare)
- **Internationalization**: Nuxt i18n (French default, English support)

### Directory Structure

- **`app/`** - Main application code
  - `components/` - Vue components organized by feature (auth, creation, filter, selection)
  - `composables/` - Reusable Vue composition functions for filtering and UI logic
  - `pages/` - File-based routing (recipes, search, user dashboard)
  - `schemas/` - Zod validation schemas for business objects and forms
  - `types/` - TypeScript type definitions
  - `utils/` - Client-side utilities and helpers

- **`server/`** - Server-side code
  - `api/` - API routes following RESTful conventions
  - `database/` - Database schema, migrations, and seed data
  - `data/` - Static data files for entities
  - `tasks/` - Background tasks (clear, seed)
  - `utils/` - Server-side utilities

- **`i18n/`** - Internationalization configuration and locale files

### Key Features Architecture

1. **Entity Management**: Recipes, ingredients, utensils, categories with full CRUD operations
2. **Filtering System**: Complex filtering using composables (`useFilter`, `useFilterIconsGrid`, etc.)
3. **Authentication**: Better Auth integration with session management
4. **Database**: Drizzle ORM with SQLite, comprehensive schema with relationships
5. **File Storage**: NuxtHub blob storage for images

### Development Notes

- Uses ESLint with stylistic rules (2-space indent, single quotes, no arrow parens)
- Database schema uses snake_case convention
- French is the default locale, code comments and UI text should follow this
- NuxtHub is configured for both database and blob storage
- Development mode uses remote database connection by default

### Database Schema Highlights

The application manages complex relationships between:
- Recipes and RecipeCategories (many-to-many through meal types)
- Recipes and Ingredients (with quantities via RecipeIngredient)
- Recipes and Allergens (many-to-many)
- Recipes and Utensils (many-to-many)
- Seasonal ingredients with specific availability periods

### Testing and Quality

- Run linting before commits: `pnpm lint`
- Database changes require migration generation: `pnpm db:generate`
- Use TypeScript strictly - all schemas are defined with Zod validation