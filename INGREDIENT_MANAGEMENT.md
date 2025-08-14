# Ingredient Management System

## Overview
Complete ingredient management system with creation, seasonal tracking, and dashboard administration.

## Core Components

### Frontend Components
- `app/components/creation/IngredientModalComponent.vue` - Ingredient creation modal
- `app/components/dashboard/IngredientsTableComponent.vue` - Ingredient management table
- `app/components/SeasonalChartComponent.vue` - Seasonal ingredient visualization

### Backend API
- `server/api/ingredients/` - Ingredient CRUD operations
  - `all.get.ts` - Get all ingredients
  - `[id].get.ts` - Get specific ingredient
  - `index.post.ts` - Create ingredient
  - `seasonals.get.ts` - Get seasonal ingredients
  - `dashboard.get.ts` - Dashboard data

### Database Schema
- `server/database/schema/ingredient.ts` - Ingredient table definition
- `server/database/schema/recipeIngredient.ts` - Recipe-ingredient relationships
- `server/database/schema/season.ts` - Seasons table
- `server/database/schema/foodType.ts` - Food type classifications
- `server/database/schema/unit.ts` - Measurement units

### Supporting APIs
- `server/api/seasons/all.get.ts` - Seasonal data
- `server/api/foodTypes/all.get.ts` - Food type categories
- `server/api/units/all.get.ts` - Measurement units

### Configuration & Types
- `app/schemas/creation/ingredient.ts` - Ingredient creation validation
- `app/types/ingredientsDashboard.ts` - Dashboard-specific types
- `app/config/dashboard/IngredientsTableConfig.ts` - Table configuration

### Data & Seeding
- `server/data/ingredients.ts` - Ingredient seed data
- `server/data/seasons.ts` - Seasonal data
- `server/data/foodTypes.ts` - Food type classifications
- `server/data/units.ts` - Measurement units

## Features
- Ingredient creation with validation
- Seasonal ingredient tracking and visualization
- Food type classification (meat, dairy, vegetables, etc.)
- Measurement unit management
- Dashboard table for ingredient administration
- Bulk ingredient management
- Ingredient-recipe relationship tracking
- Multilingual ingredient names (FR/EN)

## Key Relationships
- Ingredients belong to food types
- Ingredients have seasonal availability
- Ingredients are measured in specific units
- Ingredients are used in recipes with quantities
- Ingredients can be filtered by season and type

## Seasonal Features
- Seasonal availability tracking
- Visual seasonal charts showing ingredient availability
- Seasonal filtering in recipe search
- Seasonal ingredient recommendations

## Dashboard Management
- Tabular view of all ingredients
- Creation, editing, and deletion capabilities
- Bulk operations support
- Search and filter functionality within dashboard