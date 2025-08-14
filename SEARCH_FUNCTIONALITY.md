# Search Functionality

## Overview
Advanced search system for finding recipes, ingredients, and content across the application.

## Core Components

### Pages
- `app/pages/search.vue` - File upload interface for blob storage (search functionality appears to be embedded in other pages)

### Search Components
- `app/components/CustomDashboardSearchComponent.vue` - Dashboard-specific search component

### Backend APIs
- `server/api/recipesCategories/search.get.ts` - Recipe category search endpoint
- `server/api/blob/sign/[...pathname].get.ts` - File upload/blob storage support

### Types & Configuration
- `app/types/search.ts` - Search-related type definitions

## Features

### Recipe Search
- Search across recipe categories
- Full-text search capability
- Integration with filtering system
- Real-time search results

### Dashboard Search
- Custom search component for dashboard tables
- Search within user's created content
- Context-sensitive search based on current view

### File Upload Search
- Blob storage integration for file uploads
- Presigned URL generation for secure uploads
- File-based content search capabilities

## Search Integration Points

### Filter Integration
- Search works alongside advanced filtering system
- Combined search and filter results
- Filter state preserved during search

### Global Search
- Search functionality embedded across multiple pages
- Context-aware search based on current page/section
- Unified search experience

### Dashboard Search
- Specialized search for user's own content
- Search across recipes, ingredients, and utensils
- Quick access to user-created items

## Technical Implementation
- Server-side search processing for performance
- Search result caching and optimization
- RESTful search API endpoints
- Client-side search state management

## Search Scope
- Recipe names and descriptions
- Ingredient names and properties
- Utensil names and descriptions
- Category classifications
- User-specific content filtering

## Future Enhancements
The search system appears to be in development with:
- File upload capabilities for enhanced search
- Blob storage integration
- Advanced search algorithms
- Full-text search across all content types