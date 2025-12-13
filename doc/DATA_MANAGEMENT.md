# Data Management Feature

## Overview
Comprehensive system for managing recipe-related data including categories, meal types, dish types, seasons, allergens, and utensils.

## Key Components

### Database Schemas
- `server/database/schema/recipesCategory.ts`: Recipe categorization
- `server/database/schema/mealType.ts`: Meal type definitions
- `server/database/schema/dishType.ts`: Dish classifications
- `server/database/schema/season.ts`: Seasonal associations
- `server/database/schema/allergen.ts`: Allergen definitions
- `server/database/schema/ustensil.ts`: Kitchen utensils
- `server/database/schema/foodType.ts`: Food categorization
- `server/database/schema/unit.ts`: Measurement units

### API Endpoints
Each entity type has standard CRUD endpoints:
- `/api/[entity]/all.ts`: List all
- `/api/[entity]/[id].get.ts`: Get specific
- `/api/[entity]/index.post.ts`: Create new

### Frontend Components
- **Creation Modals**:
  - `RecipesCategoryModalComponent.vue`
  - `UstensilModalComponent.vue`
- **Selection Components**: Dropdowns and multi-selects
- **Management Tables**: CRUD interfaces for each entity

### Features
- **Hierarchical Categories**: Nested recipe categories
- **Meal Type Mapping**: Links categories to meal types
- **Seasonal Tracking**: Recipe seasonality
- **Allergen Management**: Comprehensive allergen database
- **Utensil Library**: Kitchen equipment tracking

### Data Flow
1. Admin creates base data entities
2. Entities available in dropdowns/selects
3. Used in recipe/ingredient creation
4. Enables filtering and categorization

## Technical Details
- **Seed Data**: Pre-populated common items
- **i18n Support**: Translatable entity names
- **Relations**: Many-to-many junction tables
- **Validation**: Zod schemas for data integrity
