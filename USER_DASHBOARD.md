# User Dashboard System

## Overview
Administrative dashboard for users to manage their created content including recipes, ingredients, and utensils.

## Core Components

### Pages
- `app/pages/user/dashboard.vue` - Main dashboard page with accordion layout

### Dashboard Components
- `app/components/dashboard/RecipesTableComponent.vue` - Recipe management table
- `app/components/dashboard/IngredientsTableComponent.vue` - Ingredient management table
- `app/components/dashboard/UstensilsTableComponent.vue` - Utensil management table
- `app/components/layout/DashboardSidebarComponent.vue` - Dashboard navigation sidebar

### Configuration
- `app/config/dashboard/RecipesTableConfig.ts` - Recipe table configuration
- `app/config/dashboard/IngredientsTableConfig.ts` - Ingredient table configuration
- `app/config/dashboard/UstensilsTableConfig.ts` - Utensil table configuration
- `app/config/layout/DashboardSidebarConfig.ts` - Sidebar navigation configuration

### Backend APIs
- `server/api/recipesCategories/recipes/dashboard.get.ts` - Recipe dashboard data
- `server/api/ingredients/dashboard.get.ts` - Ingredient dashboard data
- `server/api/ustensils/dashboard.get.ts` - Utensil dashboard data

### Types
- `app/types/recipesDashboard.ts` - Recipe dashboard types
- `app/types/ingredientsDashboard.ts` - Ingredient dashboard types
- `app/types/ustensilsDashboard.ts` - Utensil dashboard types

### Layout
- `app/layouts/dashboard.vue` - Dashboard-specific layout
- Uses sidebar navigation pattern

## Features

### Recipe Management
- View all created recipes and categories
- Edit recipe details
- Delete recipes
- Search and filter recipes
- Bulk operations

### Ingredient Management
- View all created ingredients
- Edit ingredient properties
- Delete ingredients
- Seasonal tracking
- Food type management

### Utensil Management
- View all created utensils
- Edit utensil details
- Delete utensils
- Usage tracking

### Dashboard Navigation
- Accordion-style interface for different sections
- Sidebar navigation for quick access
- User menu integration
- Responsive design

## User Experience
- Organized accordion layout with separate sections
- Table-based data management
- Search and filter capabilities within each section
- Bulk selection and operations
- Real-time updates when content is created/modified
- Consistent UI patterns across all management tables

## Layout Structure
- Uses `dashboard` layout with sidebar navigation
- Main content area with accordion for different sections
- Each section contains specialized management tables
- Responsive design for mobile and desktop use

## Integration Points
- Connected to creation modals for adding new content
- Real-time updates via Nuxt app hooks
- Integrated with authentication system
- Multilingual interface (FR/EN)