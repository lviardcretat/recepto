# UI Components System

## Overview
Comprehensive UI component library built on Nuxt UI and Tailwind CSS with custom components for recipe management.

## Core UI Framework

### Base Libraries
- `@nuxt/ui` - Core UI components
- `@nuxt/ui-pro` - Professional UI components
- `tailwindcss` - Utility-first CSS framework
- Custom component extensions

### Layout System
- `app/layouts/default.vue` - Default application layout
- `app/layouts/auth.vue` - Authentication pages layout  
- `app/layouts/dashboard.vue` - Dashboard layout with sidebar

## Custom Components

### Creation Components
- `app/components/creation/ButtonComponent.vue` - Custom button component
- `app/components/creation/IngredientModalComponent.vue` - Ingredient creation modal
- `app/components/creation/RecipeModalComponent.vue` - Recipe creation modal
- `app/components/creation/RecipesCategoryModalComponent.vue` - Category creation modal
- `app/components/creation/UstensilModalComponent.vue` - Utensil creation modal

### Dashboard Components
- `app/components/dashboard/IngredientsTableComponent.vue` - Ingredients data table
- `app/components/dashboard/RecipesTableComponent.vue` - Recipes data table
- `app/components/dashboard/UstensilsTableComponent.vue` - Utensils data table

### Filter Components
- `app/components/filter/PanelComponent.vue` - Main filter panel
- `app/components/filter/CustomSelectComponent.vue` - Custom dropdown component
- `app/components/filter/IconsGridComponent.vue` - Icon grid selector

### Selection Components
- `app/components/selection/AlternativeRecipesComponent.vue` - Recipe alternatives
- `app/components/selection/RecipeCardComponent.vue` - Recipe display card
- `app/components/selection/RecipeCardDetailsComponent.vue` - Detailed recipe view

### Utility Components
- `app/components/CustomDashboardSearchComponent.vue` - Dashboard search
- `app/components/CustomNuxtLoadingIndicator.vue` - Custom loading indicator
- `app/components/SeasonalChartComponent.vue` - Seasonal data visualization
- `app/components/TranslationSelectComponent.vue` - Language switcher
- `app/components/UserMenuComponent.vue` - User menu dropdown
- `app/components/modalDelete.vue` - Delete confirmation modal

### Authentication Components
- `app/components/auth/LoginComponent.vue` - Login form
- `app/components/auth/RegisterComponent.vue` - Registration form
- `app/components/auth/AnonymousRestrictionModalComponent.vue` - Guest restrictions modal

### Layout Components
- `app/components/layout/DashboardSidebarComponent.vue` - Dashboard sidebar navigation

## Component Features

### Data Tables
- Built with `@tanstack/vue-table`
- Sorting, filtering, and pagination
- Bulk selection and operations
- Responsive design
- Custom column configurations

### Modal System
- Creation modals for all entity types
- Form validation with Zod schemas
- Multilingual support
- Loading states and error handling

### Filter System
- Multi-type filter components (select, icons, switches)
- Real-time filtering
- State persistence
- Visual feedback

### Card Components
- Recipe display cards
- Detailed recipe views
- Alternative suggestions
- Responsive layouts

## Styling System

### Tailwind Configuration
- Custom CSS in `app/assets/css/main.css`
- Tailwind CSS v4 integration
- Custom color schemes
- Responsive utilities

### Component Styling
- Utility-first approach
- Consistent design patterns
- Dark mode support preparation
- Mobile-responsive designs

## Icon System

### Icon Libraries
Multiple Iconify collections:
- `@iconify-json/lucide` - Primary icons
- `@iconify-json/material-symbols` - Material design icons
- `@iconify-json/fa6-solid` - Font Awesome icons
- Custom allergen icons in `app/assets/icons/allergens/`

### Custom Icon Configuration
```typescript
icon: {
  customCollections: [{
    prefix: 'allergens-icons',
    dir: './app/assets/icons/allergens'
  }]
}
```

## Visualization Components

### Charts and Graphs
- `app/components/SeasonalChartComponent.vue` - Seasonal ingredient charts
- `@unovis/vue` integration for data visualization
- Interactive charts and graphs

### Data Display
- Tables with sorting and filtering
- Card-based layouts
- Grid displays for icons and images
- List views with pagination

## Component Configuration

### Configuration Files
- `app/config/dashboard/` - Dashboard table configurations
- `app/config/filter/` - Filter panel configurations
- `app/config/layout/` - Layout configurations
- `app/config/UserMenuConfig.ts` - User menu configuration

### Reusable Patterns
- Consistent prop interfaces
- Standardized event handling
- Shared composables for common functionality
- Type-safe component development