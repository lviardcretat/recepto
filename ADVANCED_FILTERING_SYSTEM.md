# Advanced Filtering System

## Overview
Comprehensive filtering system for recipes with multiple filter types including dropdowns, icon grids, and toggle switches.

## Core Components

### Frontend Components
- `app/components/filter/PanelComponent.vue` - Main filter panel container
- `app/components/filter/CustomSelectComponent.vue` - Dropdown filter component
- `app/components/filter/IconsGridComponent.vue` - Icon-based filter grid (allergens, seasons)

### Composables
- `app/composables/useFilter.ts` - Main filter state management
- `app/composables/useFilterSelectMenu.ts` - Select menu filter logic
- `app/composables/useFilterIconsGrid.ts` - Icon grid filter logic
- `app/composables/useFilterSwitch.ts` - Switch filter logic

### Utilities
- `app/utils/filterUtils.ts` - Core filter processing utilities
- `app/utils/filterIconsGridUtils.ts` - Icon grid specific utilities
- `app/utils/filterSelectMenuUtils.ts` - Select menu utilities
- `app/utils/mapSelectMenuItemsUtils.ts` - Data mapping utilities

### Configuration & Types
- `app/config/filter/PanelConfig.ts` - Filter panel configuration
- `app/schemas/filter.ts` - Filter validation schemas
- `app/types/filter.ts` - Filter type definitions
- `app/enums/filter.ts` - Filter enumerations

### Backend Support
- `server/api/recipesCategories/filtered.get.ts` - Filtered recipe categories
- `server/api/recipesCategories/recipes/filtered.get.ts` - Filtered recipes
- `server/utils/filterUtils.ts` - Server-side filter processing

## Filter Types

### Select Menu Filters
- Recipe categories
- Meal types (breakfast, lunch, dinner)
- Dish types (appetizer, main course, dessert)
- Food types (meat, vegetarian, vegan)
- Units of measurement

### Icon Grid Filters
- **Allergens**: Visual allergen selection with custom SVG icons
  - Located in `app/assets/icons/allergens/`
  - Includes: gluten, eggs, milk, fish, nuts, etc.
- **Seasons**: Seasonal ingredient filtering
- **Difficulty levels**: Recipe complexity filtering

### Switch Filters
- Boolean toggles for various recipe properties
- Quick enable/disable functionality

## Features
- Real-time filtering without page refresh
- Multiple filter combination logic
- Visual feedback with icons and badges
- Filter state persistence
- Reset functionality
- Multilingual filter labels
- Server-side filter processing for performance
- Custom select components with search
- Icon-based allergen filtering with custom SVGs

## Filter Flow
1. User selects filters in `PanelComponent`
2. State managed by respective composables
3. `FilterUtils.fetchFilteredItems()` processes filters
4. Server API applies filters to database queries
5. Results update in real-time on recipe pages

## Key Files
- Filter composables handle state management
- Utils handle data processing and API calls
- Custom components provide UI interactions
- Server utils handle database filtering logic