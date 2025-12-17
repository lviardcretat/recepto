# Filtering and Search Feature

## Overview
Advanced filtering and search capabilities across recipes, ingredients, and other entities with multiple criteria support.

## Key Components

### Schemas
- **Filter Schema**: `app/schemas/filter.ts`
  - Defines filter criteria structure
  - Type-safe filter validation

### API Endpoints
- **Recipe Filtering**: `/server/api/recipesCategories/filtered.get.ts`
- **Ingredient Search**: `/server/api/ingredients/search.get.ts`
- **Category Search**: `/server/api/recipesCategories/search.get.ts`
- Pattern: Most entities have `filtered.get.ts` and `search.get.ts` endpoints

### Frontend Components
- **Filter Components**: `app/components/filter/`
  - Dynamic filter UI generation
  - Multi-criteria selection
  - Real-time filter application
- **Search Component**: `app/components/CustomDashboardSearchComponent.vue`
  - Global search functionality
- **Search Page**: `app/pages/search.vue`
  - Dedicated search interface

### Filter Criteria
- **Recipe Filters**:
  - Season, category, meal type
  - Cooking/prep time ranges
  - Allergen exclusion
  - Ingredient inclusion/exclusion
- **Ingredient Filters**:
  - Food type
  - Allergen presence
  - Name search

### Data Flow
1. User selects filter criteria in UI
2. Criteria serialized to query parameters
3. API applies filters via Drizzle ORM queries
4. Filtered results returned and displayed
5. Filters persist in URL for sharing

## Technical Details
- **Query Building**: Dynamic SQL generation with Drizzle
- **Performance**: Indexed columns for filter fields
- **URL State**: Filter state in query params
- **Composables**: Reusable filter logic via `app/composables/`
