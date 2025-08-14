# Utensil Management System

## Overview
Kitchen utensil management system for tracking cooking tools and equipment used in recipes.

## Core Components

### Frontend Components
- `app/components/creation/UstensilModalComponent.vue` - Utensil creation modal
- `app/components/dashboard/UstensilsTableComponent.vue` - Utensil management table

### Backend API
- `server/api/ustensils/` - Utensil CRUD operations
  - `all.get.ts` - Get all utensils
  - `index.post.ts` - Create utensil
  - `dashboard.get.ts` - Dashboard data

### Database Schema
- `server/database/schema/ustensil.ts` - Utensil table definition
- `server/database/schema/recipeToUstensil.ts` - Recipe-utensil relationships

### Configuration & Types
- `app/schemas/creation/ustensil.ts` - Utensil creation validation
- `app/types/ustensilsDashboard.ts` - Dashboard-specific types
- `app/config/dashboard/UstensilsTableConfig.ts` - Table configuration

### Data & Seeding
- `server/data/ustensils.ts` - Utensil seed data

## Features
- Utensil creation and management
- Recipe-utensil relationship tracking
- Dashboard administration interface
- Validation for utensil properties
- Multilingual utensil names (FR/EN)
- Bulk utensil management

## Key Relationships
- Utensils are used by multiple recipes
- Recipes can require multiple utensils
- Many-to-many relationship through `recipeToUstensil` table

## Dashboard Management
- Tabular view of all utensils
- Create, edit, and delete utensils
- Search and filter functionality
- Bulk operations support
- Usage tracking across recipes

## Utensil Categories
Common utensil types supported:
- Cooking pots and pans
- Baking equipment
- Cutting tools
- Measuring tools
- Kitchen appliances
- Serving items

## Integration
- Used in recipe creation process
- Filterable in recipe search
- Displayed in recipe details
- Tracked in user dashboard