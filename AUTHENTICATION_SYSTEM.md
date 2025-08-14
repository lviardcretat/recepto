# Authentication System

## Overview
Complete user authentication system with login, registration, and guest access for the Recepto application.

## Core Components

### Frontend Components
- `app/components/auth/LoginComponent.vue` - Login form with email/password
- `app/components/auth/RegisterComponent.vue` - User registration form
- `app/components/auth/AnonymousRestrictionModalComponent.vue` - Modal for guest user restrictions
- `app/pages/login.vue` - Auth page with tabbed login/register interface

### Backend API
- `server/api/auth/login.post.ts` - User authentication endpoint
- `server/api/auth/register.post.ts` - User registration endpoint  
- `server/api/auth/guest.post.ts` - Guest session creation

### Configuration & Schemas
- `app/schemas/auth/login.ts` - Login form validation schema
- `app/schemas/auth/register.ts` - Registration form validation schema
- `app/enums/login.ts` - Login types enumeration
- `app/middleware/auth.global.ts` - Global authentication middleware

### Database Schema
- `server/database/schema/user.ts` - User table definition
- `server/data/user.ts` - User seed data

## Features
- Email/password authentication
- User registration with validation
- Guest access with restrictions
- Session management via nuxt-auth-utils
- Multilingual authentication forms (FR/EN)
- Global authentication middleware protection

## Key Files
- Auth layout: `app/layouts/auth.vue`
- Shared types: `shared/auth.d.ts`
- Auth pages use `layout: 'auth'` meta