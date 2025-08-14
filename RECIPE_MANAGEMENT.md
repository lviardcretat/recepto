# Recipe Management System

## Overview
Core recipe and recipe category management with CRUD operations, filtering, and detailed recipe views.

## Core Components

### Frontend Components
- `app/components/creation/RecipeModalComponent.vue` - Recipe creation modal
- `app/components/creation/RecipesCategoryModalComponent.vue` - Recipe category creation modal
- `app/components/selection/RecipeCardComponent.vue` - Recipe display card
- `app/components/selection/RecipeCardDetailsComponent.vue` - Detailed recipe view
- `app/components/selection/AlternativeRecipesComponent.vue` - Alternative recipes suggestions
- `app/components/dashboard/RecipesTableComponent.vue` - Recipe management table

### Pages
- `app/pages/recipes/all.vue` - Recipe categories listing with filtering
- `app/pages/recipes/[id].vue` - Individual recipe category view
- `app/pages/index.vue` - Hero page showcasing recipe features

### Backend API
- `server/api/recipesCategories/` - Recipe category CRUD operations
  - `all.get.ts` - Get all categories
  - `[id].get.ts` - Get specific category
  - `filtered.get.ts` - Filtered categories
  - `index.post.ts` - Create category
  - `search.get.ts` - Search categories
- `server/api/recipesCategories/recipes/` - Recipe CRUD operations
  - `all.get.ts` - Get all recipes
  - `[id].get.ts` - Get specific recipe
  - `filtered.get.ts` - Filtered recipes
  - `index.post.ts` - Create recipe
  - `dashboard.get.ts` - Dashboard data

### Database Schema
- `server/database/schema/recipe.ts` - Recipe table definition
- `server/database/schema/recipesCategory.ts` - Recipe categories table
- `server/database/schema/recipeIngredient.ts` - Recipe-ingredient relationships
- `server/database/schema/recipeToUstensil.ts` - Recipe-utensil relationships

### Configuration & Types
- `app/schemas/creation/recipe.ts` - Recipe creation validation
- `app/schemas/creation/recipesCategory.ts` - Category creation validation
- `app/types/recipeCard.ts` - Recipe card types
- `app/types/recipesDashboard.ts` - Dashboard-specific types
- `app/config/dashboard/RecipesTableConfig.ts` - Table configuration

## Features
- Recipe category creation and management
- Individual recipe creation with ingredients and utensils
- Recipe filtering by multiple criteria
- Recipe search functionality
- Recipe cards with detailed views
- Alternative recipe suggestions
- Dashboard management interface
- Multilingual support (FR/EN)

## Key Relationships
- Recipes belong to categories
- Recipes have many ingredients (with quantities/units)
- Recipes use many utensils
- Recipes can have allergens
- Recipes support seasonal filtering