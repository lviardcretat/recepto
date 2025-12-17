# Dashboard Feature

## Overview
User dashboard providing overview of recipes, ingredients, and utensils with quick access to management functions.

## Key Components

### Pages
- **Dashboard Page**: `app/pages/user/dashboard.vue`
  - Main dashboard interface
  - Statistics and summaries

### Frontend Components
- **Table Components**: `app/components/dashboard/`
  - `RecipesTableComponent.vue`: Recipe listing
  - `IngredientsTableComponent.vue`: Ingredient listing
  - `UstensilsTableComponent.vue`: Utensil listing
- **Search Component**: `app/components/CustomDashboardSearchComponent.vue`
  - Quick search across entities

### API Endpoints
- `/server/api/recipesCategories/recipes/dashboard.get.ts`
  - Dashboard-specific data aggregation
  - Optimized queries for overview data

### Features
- **Quick Stats**: Recipe counts, recent additions
- **Table Views**: Sortable/filterable lists
- **Quick Actions**: Create, edit, delete operations
- **Search**: Integrated search across all entities

### Data Flow
1. Dashboard loads aggregated data
2. Tables fetch paginated entity lists
3. User interactions trigger API calls
4. Real-time updates via Nuxt hooks

## Technical Details
- **Performance**: Optimized queries for dashboard data
- **Pagination**: Efficient data loading
- **Caching**: Smart data caching strategies
- **Responsive**: Mobile-friendly table views
