# Weekly Planner Feature

## Overview
Weekly meal planning system allowing users to schedule recipes for each day and meal type, facilitating meal preparation and organization.

## Key Components

### Database Schema
- **Sequences**: `server/database/schema/sequence.ts`
  - Stores planned meals/recipes for specific dates
  - Links recipes to calendar slots

### API Endpoints
**Base**: `/server/api/sequences/`
- `all.ts`: Fetch all planned sequences
- `index.post.ts`: Create new meal plan

### Frontend Components
- **Calendar Integration**: Uses v-calendar for date selection
- **Meal Type Selection**: Breakfast, lunch, dinner planning
- **Recipe Assignment**: Drag-and-drop or select recipes for dates

### Features
- **Weekly View**: Visual weekly meal calendar
- **Recipe Scheduling**: Assign recipes to specific days/meals
- **Meal Types**: Support for different meal categories
- **Repeat Patterns**: Schedule recurring meals

### Data Flow
1. User selects week/date range
2. Assigns recipes to meal slots
3. Saves sequence to database
4. Calendar view updates
5. Shopping list generation from planned meals

## Technical Details
- **Calendar Library**: v-calendar integration
- **Date Management**: date-fns for date operations
- **Meal Types**: Configurable meal categories
- **Persistence**: Sequences saved per user
