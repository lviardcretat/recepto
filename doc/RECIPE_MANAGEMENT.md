# Recipe Management Feature

## Overview
Core feature for creating, managing, and organizing recipes with detailed information including ingredients, cooking steps, allergens, and utensils.

## Key Components

### Database Schema
- **Main Table**: `server/database/schema/recipe.ts`
  - Stores recipe metadata (name, times, servings, season, category)
  - Relations to ingredients, allergens, utensils, sequences
- **Related Tables**:
  - `recipeIngredient.ts`: Recipe-ingredient junction with quantities
  - `allergenToRecipe.ts`: Recipe allergen associations
  - `recipeToUstensil.ts`: Required utensils mapping
  - `sequence.ts`: Cooking steps/instructions

### API Endpoints
**Base**: `/server/api/recipesCategories/recipes/`
- `all.get.ts`: Fetch all recipes
- `[id].get.ts`: Get specific recipe
- `index.post.ts`: Create new recipe
- `filtered.get.ts`: Filter recipes by criteria
- `dashboard.get.ts`: Dashboard recipe data

### Frontend Components
- **Creation Modal**: `app/components/creation/RecipeModalComponent.vue`
  - Complex form with ingredient selection, quantity inputs
  - Dynamic sequence/step management
  - Allergen and utensil selection
  - Inline creation of missing ingredients/categories
- **Display Table**: `app/components/dashboard/RecipesTableComponent.vue`
  - Tabular recipe display with sorting/filtering
- **Recipe Pages**: `app/pages/recipes/`
  - `all.vue`: Browse all recipes
  - `[id].vue`: Individual recipe view

### Data Flow
1. User creates recipe via modal form
2. Form validates using Zod schema (`app/schemas/creation/recipe.ts`)
3. POST to `/api/recipesCategories/recipes/`
4. Server creates recipe with all relations
5. UI updates via Nuxt hooks (`recipe:created`)

## Technical Details
- **Validation**: Zod schemas for type-safe forms
- **i18n**: Full internationalization support
- **Relations**: Complex many-to-many relationships
- **Real-time**: Hook-based UI updates after creation
