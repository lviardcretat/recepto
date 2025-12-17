# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository

## 📋 Project Overview

Recepto is an open source project that creates, filters, and hosts recipes
The project is community-based, meaning that recipes are created solely by users

### Key concepts:

- A recipe category is a category that groups together several recipes of the same type.
For example, the lasagna category will group together the “vegetarian lasagna” recipe and the “beef lasagna” recipe
- Recepto aims to be as simple as possible: logging in and registering only requires a username and password

### Existing features:

- Creation of ingredients, utensils, recipe categories, and recipes
- Filtering recipes by: ingredients, utensils, allergens, meal types, and dish types
- Visualization of seasonal ingredients
- Login and registration
- Dark/Light mode
- Language selection system
- Guest login

### Features in progress:

- A dashboard page for managing recipes (editing, deleting, etc.)

### Features not yet implemented but planned:

- A planning page for planning recipes for a week and generating an automatic shopping list based on that
- A settings page for managing user data (changing password, username, etc.)

## 🏗️ Project Architecture

```
recepto/
├── app/                     # Main Nuxt folder (app directory)
│   ├── components/          # Vue components organized by feature
│   ├── pages/               # File-based routing
│   ├── layouts/             # Application layouts
│   ├── composables/         # Reusable Vue composition functions for filtering and UI logic
│   ├── middleware/          # Route middleware (auth, etc.)
│   ├── schemas/             # Zod validation schemas for business objects and forms
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Client-side utilities and helpers
├── server/                  # Nitro Backend
│   ├── api/                 # API routes following RESTful conventions
│   ├── database/            # Database schema, migrations, and seed data
│   ├── data/                # Files used to query the database
│   ├── tasks/               # Background tasks (clear, seed)
│   └── utils/               # Server utilities
└── i18n/                    # Internationalization configuration and locale files

```

## 📝 Main Commands

```bash
# Development
pnpm run dev            # Development server

# Build & Production
pnpm run build          # Production build
pnpm run preview        # Preview build
pnpm run start          # Start in production

# Code quality
pnpm run lint           # ESLint linting
pnpm run lint:fix       # Automatic fix
pnpm run typecheck      # TypeScript verification

# Database
pnpm run db:migrate     # Supabase migrations
pnpm run db:seed        # Test data seed
pnpm run db:reset       # Complete reset
```

## 🚨 Points of Attention
### To do systematically

* ✅ Handle loading and error states
* ✅ Document complex functions with JSDoc
* ✅ Check the use of ClientOnly if necessary for hydration mismatch issues
* ✅ Uses ESLint with stylistic rules (2-space indent, single quotes, no arrow parens)
* ✅ use snake_case convention for database names
* ✅ Always read the documentation, on any subject. If I haven't provided it, and if it's not provided above, look for it on the internet
* ✅ Respect the location of the files, don't put code in a folder that has nothing to do with it, follow the structure established above
* ✅ Development mode uses remote database connection by default
* ✅ Code in English, even for comments
* ✅ Only use imports for external libraries; Nuxt automatically imports all files, components, interfaces, etc
* ✅ Use TypeScript strictly - all schemas are defined with Zod validation
* ✅ Database changes require migration generation: pnpm db:migrate
* ✅ Always work with the existing codebase - do not create new simplified alternatives
* ✅ Always find and fix the root cause of issues instead of creating workarounds
* ✅ When debugging issues, focus on fixing the existing implementation, not replacing it
* ✅ When something doesn't work, debug and fix it - don't start over with a simple version
* ✅ Always add explicit types to all function parameters, variables, and return types
* ✅ Fix all linter and TypeScript errors immediately - don't leave them for the user to fix
* ✅ When making changes to multiple files, check each one for type errors
* ✅ Update this file if things have changed, keep this file as up to date as possible
* ✅ Always use the path '~~/server' instead of '~/server' to import files from the server
* ✅ Always use the schemas in the file '/server/utils/drizzleUtils.ts'

### To avoid

* ❌ Store sensitive data on the client side
* ❌ Make API requests without error handling
* ❌ Directly manipulate the DOM (use Vue refs)
* ❌ Forget to clean up event listeners and watchers
* ❌ Never replace existing complex components with simplified versions - 

## 📚 Resources and Documentation

- [Documentation Nuxt 4](https://nuxt.com/docs)
- [Drizzle](https://orm.drizzle.team/docs/overview)
- [Vue 4 Documentation](https://vuejs.org)
- [Nuxt hub](https://hub.nuxt.com/docs/getting-started)
- [Nuxt ui / pro](https://ui.nuxt.com/getting-started)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Nuxt auth utils](https://nuxt.com/modules/auth-utils)

## 🔄 Git Workflow

### Branches
- `master` : Production
- `dev` : Development

### Commit convention (Conventional Commits)

```
[feat | fix | docs | style | refactor | test | chore | version]: COMMIT_DESCRIPTION
```

---

*Dernière mise à jour: 14 août 2025*
