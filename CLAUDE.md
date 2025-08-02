# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository

## Project Overview

Recepto is an open source project that creates, filters, and hosts recipes
The project is community-based, meaning that recipes are created solely by users

## Key concepts:

- A recipe category is a category that groups together several recipes of the same type.
For example, the lasagna category will group together the “vegetarian lasagna” recipe and the “beef lasagna” recipe
- Recepto aims to be as simple as possible: logging in and registering only requires a username and password

## Existing features:

- Creation of ingredients, utensils, recipe categories, and recipes
- Filtering recipes by: ingredients, utensils, allergens, meal types, and dish types
- Visualization of seasonal ingredients
- Login and registration
- Dark/Light mode
- Language selection system

## Features not yet implemented but planned:

- Guest login
- A dashboard page for managing recipes (editing, deleting, etc.)
- A planning page for planning recipes for a week and generating an automatic shopping list based on that
- A settings page for managing user data (changing password, username, etc.)

## Common Commands

### Development

- `pnpm run dev` - Start development server

### Database Operations

- `pnpm run db:migrate` - Run database migrations
- `pnpm db:visualizer` - Launch Drizzle Lab visualizer

### Package Management

- Uses `pnpm` (version 10.12.4) as package manager

## Architecture Overview

### Tech Stack

- **Framework**: Nuxt.js 3 (with Nuxt 4 compatibility. (Based on Nuxt 4 documentation)) with TypeScript
- **Database**: SQLite with Drizzle ORM
- **Styling**: Tailwind CSS 4 + Nuxt UI PRO
- **Authentication**: Nuxt auth utils
- **Deployment**: NuxtHub (Cloudflare)
- **Internationalization**: Nuxt i18n (French default, English support)

### Documentation

- Nuxt auth utils : https://nuxt.com/modules/auth-utils
- Drizzle : https://orm.drizzle.team/docs/overview
- Nuxt hub : https://hub.nuxt.com/docs/getting-started
- Nuxt ui / pro : https://ui.nuxt.com/getting-started
- Tailwind : https://tailwindcss.com/docs/installation/using-vite
- NuxtJS : https://nuxt.com/docs/4.x/getting-started/introduction
- Git project repository : https://github.com/lviardcretat/recepto

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
  - `data/` - Files used to query the database
  - `tasks/` - Background tasks (clear, seed)
  - `utils/` - Server-side utilities

- **`i18n/`** - Internationalization configuration and locale files

### Be sure to follow this

- Uses ESLint with stylistic rules (2-space indent, single quotes, no arrow parens)
- Database schema uses snake_case convention
- Always read the documentation, on any subject. If I haven't provided it, look for it on the internet
- Ask me as many questions as possible to help you better understand my needs
- Respect the location of the files, don't put code in a folder that has nothing to do with it, follow the structure established above
- Respect naming conventions, make the code readable and clean
- Development mode uses remote database connection by default
- Code in English, even for comments
- Only use imports for external libraries; Nuxt automatically imports all files, components, interfaces, etc
- Use TypeScript strictly - all schemas are defined with Zod validation
- Database changes require migration generation: `pnpm db:migrate`
