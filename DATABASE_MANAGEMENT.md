# Database Management System

## Overview
Comprehensive database system using Drizzle ORM with SQLite/D1, including schema definitions, migrations, and seeding.

## Database Configuration

### Core Configuration
- `drizzle.config.ts` - Drizzle configuration
- `server/database/columns.helper.ts` - Common column helper functions
- `server/utils/drizzleUtils.ts` - Database utility functions

### Schema Definitions
Located in `server/database/schema/`:
- `user.ts` - User accounts
- `recipe.ts` - Recipe definitions
- `recipesCategory.ts` - Recipe categories
- `ingredient.ts` - Ingredient definitions
- `ustensil.ts` - Kitchen utensils
- `recipeIngredient.ts` - Recipe-ingredient relationships
- `recipeToUstensil.ts` - Recipe-utensil relationships
- `allergen.ts` - Allergen definitions
- `allergenToRecipe.ts` - Recipe-allergen relationships
- `season.ts` - Seasonal data
- `foodType.ts` - Food type classifications
- `dishType.ts` - Dish type categories
- `mealType.ts` - Meal type definitions
- `mealTypeToRecipeCategory.ts` - Meal type relationships
- `unit.ts` - Measurement units
- `sequence.ts` - Recipe sequence/steps

## Migration System

### Migration Files
Located in `server/database/migrations/`:
- `0000_icy_madame_hydra.sql` - Initial schema
- `0001_orange_falcon.sql` - Schema updates
- `0002_fresh_giant_girl.sql` - Additional changes
- `0003_real_energizer.sql` - Further modifications
- `0004_young_blade.sql` - Latest changes

### Migration Management
- `meta/` directory contains migration snapshots
- `_journal.json` tracks migration history
- Automated migration generation via Drizzle Kit

### NPM Scripts
```json
{
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit generate", 
  "db:push": "drizzle-kit push",
  "db:visualizer": "npx drizzle-lab@latest visualizer"
}
```

## Data Seeding

### Seed Data Files
Located in `server/data/`:
- `user.ts` - Default users
- `recipes.ts` - Sample recipes
- `recipesCategories.ts` - Recipe categories
- `ingredients.ts` - Ingredient catalog
- `ustensils.ts` - Utensil catalog
- `allergens.ts` - Allergen definitions
- `seasons.ts` - Seasonal data
- `foodTypes.ts` - Food classifications
- `dishTypes.ts` - Dish categories
- `mealTypes.ts` - Meal categories
- `units.ts` - Measurement units
- `sequences.ts` - Recipe steps
- Relationship tables for many-to-many associations

### Seed Tasks
Located in `server/database/seed/`:
- Individual seed files for each table
- `server/tasks/seed.ts` - Main seeding task
- `server/tasks/clear.ts` - Database clearing task

## Database Features

### Relationship Management
- Many-to-many relationships (recipes ↔ ingredients, recipes ↔ utensils)
- One-to-many relationships (categories → recipes)
- Junction tables for complex relationships
- Foreign key constraints

### Data Integrity
- Schema validation via Drizzle
- Type-safe database operations  
- Automated relationship management
- Migration version control

### Performance Features
- Indexed columns for search performance
- Optimized query patterns
- Efficient relationship queries
- Bulk operations support

## NuxtHub Integration

### Cloud Database
- `@nuxthub/core` module integration
- Cloudflare D1 database support
- Remote database connection
- Blob storage integration

### Development vs Production
```typescript
$development: {
  hub: {
    remote: true // Use remote database in development
  }
},
hub: {
  database: true,
  blob: true
}
```

## Utility Functions

### Database Utils
- `server/utils/drizzleUtils.ts` - Common database operations
- `server/utils/autoChunkUtils.ts` - Bulk operation utilities
- Type-safe query builders
- Error handling helpers

### Column Helpers
- Standardized column definitions
- Common field patterns
- Consistent data types
- Reusable schema components