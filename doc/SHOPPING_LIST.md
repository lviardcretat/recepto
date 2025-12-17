# Shopping List Feature

## Overview
Automatic shopping list generation based on weekly meal plans, aggregating ingredients from scheduled recipes with quantity calculations.

## Key Components

### Generation Logic
- Aggregates ingredients from planned recipes
- Combines quantities for duplicate ingredients
- Accounts for serving size adjustments
- Groups by food type/category

### API Integration
- Pulls data from sequences (meal plans)
- Fetches recipe ingredients with quantities
- Calculates total amounts needed

### Frontend Components
- **Shopping List View**: Display of aggregated ingredients
- **Quantity Adjustment**: Modify amounts as needed
- **Check-off Interface**: Mark items as purchased
- **Export Options**: Print or share lists

### Features
- **Automatic Generation**: From weekly meal plans
- **Smart Aggregation**: Combines same ingredients
- **Unit Conversion**: Standardizes measurements
- **Categorization**: Groups by store sections

### Data Flow
1. User creates weekly meal plan
2. System aggregates all recipe ingredients
3. Quantities calculated based on servings
4. List generated with totals
5. User can modify/export list

## Technical Details
- **Quantity Math**: Accurate unit conversions
- **Grouping Logic**: Smart categorization
- **Export Formats**: PDF, text, shareable links
- **Real-time Updates**: Reflects plan changes
