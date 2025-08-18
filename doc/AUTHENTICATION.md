# Authentication Feature

## Overview
User authentication and session management system using Nuxt Auth Utils for secure access control.

## Key Components

### Database Schema
- **Main Table**: `server/database/schema/user.ts`
  - User profiles with credentials
  - Timestamps for tracking
  - Relations to created content

### API Endpoints
**Base**: `/server/api/auth/`
- `login.post.ts`: User login endpoint
- `logout.post.ts`: Session termination
- `session.get.ts`: Current session info

### Frontend Components
- **Login Page**: `app/pages/login.vue`
  - Authentication form
  - Session initialization
- **User Menu**: `app/components/UserMenuComponent.vue`
  - Profile dropdown
  - Logout functionality
- **Auth Layout**: `app/layouts/auth.vue`
  - Layout for authenticated pages

### Middleware
- `app/middleware/auth.ts`: Route protection
- Redirects unauthenticated users

### Data Flow
1. User submits credentials on login page
2. Server validates via auth API
3. Session created with `nuxt-auth-utils`
4. Protected routes accessible
5. User context available throughout app

## Technical Details
- **Session Management**: Cookie-based sessions
- **Route Protection**: Middleware-based access control
- **User Context**: Available via composables
- **Security**: Password hashing, CSRF protection
