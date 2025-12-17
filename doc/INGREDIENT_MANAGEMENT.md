# Ingredient Management Feature

## Overview
System for managing ingredients with nutritional data, allergen information, and categorization for use in recipes.

## Key Components

### Database Schema
- **Main Table**: `server/database/schema/ingredient.ts`
  - Stores ingredient details (name, food type, allergens)
  - Nutritional information fields
- **Related Tables**:
  - `recipeIngredient.ts`: Links ingredients to recipes with quantities
  - `foodType.ts`: Ingredient categorization
  - `unit.ts`: Measurement units for quantities

### API Endpoints
**Base**: `/server/api/ingredients/`
- `all.ts`: Fetch all ingredients
- `[id].get.ts`: Get specific ingredient
- `index.post.ts`: Create new ingredient
- `filtered.get.ts`: Filter by criteria
- `search.get.ts`: Search ingredients

### Frontend Components
- **Creation Modal**: `app/components/creation/IngredientModalComponent.vue`
  - Form for ingredient creation
  - Food type selection
  - Allergen association
- **Display Table**: `app/components/dashboard/IngredientsTableComponent.vue`
  - List view with sorting/filtering
- **Selection Components**: Used in recipe creation for ingredient picking

### Data Flow
1. Ingredient created via modal or inline during recipe creation
2. Validated and stored with food type association
3. Available for selection in recipe forms
4. Quantities tracked via junction table

## Technical Details
- **Units System**: Flexible measurement units (g, ml, pieces, etc.)
- **Allergen Tracking**: Direct allergen associations
- **Search**: Full-text search capability
- **Inline Creation**: Can create ingredients on-the-fly during recipe creation
