# Recepto - Recipe Management Application

## Project Overview
Recepto is a comprehensive recipe management application built with Nuxt 3, featuring recipe creation, advanced filtering, ingredient management, and multi-language support.

## Major Features

### [Authentication System](./AUTHENTICATION_SYSTEM.md)
Complete user authentication with login, registration, and guest access. Includes session management and multilingual auth forms.

### [Recipe Management](./RECIPE_MANAGEMENT.md) 
Core recipe and category management system with CRUD operations, detailed recipe views, and relationship tracking with ingredients/utensils.

### [Advanced Filtering System](./ADVANCED_FILTERING_SYSTEM.md)
Comprehensive filtering with dropdown menus, icon grids, and toggle switches. Supports allergen filtering, seasonal ingredients, and multiple filter combinations.

### [Ingredient Management](./INGREDIENT_MANAGEMENT.md)
Complete ingredient system with seasonal tracking, food type classification, and measurement unit management. Includes seasonal visualization charts.

### [Utensil Management](./UTENSIL_MANAGEMENT.md)
Kitchen utensil management for tracking cooking tools and equipment used in recipes with dashboard administration.

### [User Dashboard](./USER_DASHBOARD.md)
Administrative interface for users to manage their created content with accordion layout and specialized management tables.

### [Search Functionality](./SEARCH_FUNCTIONALITY.md)
Advanced search system for recipes and content with blob storage integration and context-aware search capabilities.

### [Internationalization](./INTERNATIONALIZATION.md)
Multi-language support (French/English) with browser detection, lazy loading, and Zod form validation translations.

### [Database Management](./DATABASE_MANAGEMENT.md)
Comprehensive database system using Drizzle ORM with SQLite/D1, including migrations, seeding, and NuxtHub cloud integration.

### [UI Components System](./UI_COMPONENTS_SYSTEM.md)
Component library built on Nuxt UI with custom modals, tables, filters, and visualization components. Includes Tailwind CSS styling and Iconify icon system.

## Tech Stack
- **Framework**: Nuxt 3 with SSR
- **Database**: Drizzle ORM with SQLite/Cloudflare D1
- **UI**: Nuxt UI, Tailwind CSS v4
- **Authentication**: nuxt-auth-utils
- **Internationalization**: @nuxtjs/i18n
- **Deployment**: NuxtHub/Cloudflare
- **Icons**: Iconify with custom allergen SVGs
- **Charts**: Unovis for data visualization

## Development Commands
```bash
# Development
pnpm dev

# Database
pnpm db:generate    # Generate migrations
pnpm db:push        # Push to database
pnpm db:visualizer  # View schema

# Build
pnpm build
```

## Architecture Highlights
- Modular component architecture
- Server-side filtering and search
- Real-time updates via Nuxt app hooks  
- Type-safe development with TypeScript
- Responsive design with mobile support
- Cloud-native with Cloudflare integration

### Critical Rules - DO NOT VIOLATE
- **NEVER create mock data or simplified components** unless explicitly told to do so
- **NEVER replace existing complex components with simplified versions** - always fix the actual problem
- **ALWAYS work with the existing codebase** - do not create new simplified alternatives
- **ALWAYS find and fix the root cause** of issues instead of creating workarounds
- When debugging issues, focus on fixing the existing implementation, not replacing it
- When something doesn't work, debug and fix it - don't start over with a simple version
- ALWAYS add explicit types to all function parameters, variables, and return types
- Fix all linter and TypeScript errors immediately - don't leave them for the user to fix
- When making changes to multiple files, check each one for type errors
- Uses ESLint with stylistic rules (2-space indent, single quotes, no arrow parens)
- Database schema uses snake_case convention
- Always read the documentation, on any subject. If I haven't provided it, look for it on the internet
- Ask me as many questions as possible to help you better understand my needs
- Respect the location of the files, don't put code in a folder that has nothing to do with it
- Respect naming conventions, make the code readable and clean
- Development mode uses remote database connection by default
- Code in English, even for comments
- Only use imports for external libraries; Nuxt automatically imports all files, components, interfaces, etc
- Use TypeScript strictly - all schemas are defined with Zod validation
- Database changes require migration generation: `pnpm db:migrate`
