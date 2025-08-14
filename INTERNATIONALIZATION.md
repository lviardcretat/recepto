# Internationalization System

## Overview
Multi-language support system providing French and English localization throughout the application.

## Core Configuration

### Main Configuration
- `i18n/i18n.config.ts` - Main i18n configuration
- `nuxt.config.ts` - Nuxt i18n module configuration with French as default

### Translation Files
- `i18n/locales/fr.json` - French translations
- `i18n/locales/en.json` - English translations

### Nuxt Configuration
```typescript
i18n: {
  defaultLocale: 'fr',
  locales: [
    { code: 'fr', name: 'Français', file: 'fr.json' },
    { code: 'en', name: 'English', file: 'en.json' }
  ],
  strategy: 'no_prefix', // No URL prefix for languages
  detectBrowserLanguage: true,
  lazy: true // Lazy load translation files
}
```

## Translation Integration

### Components
- `app/components/TranslationSelectComponent.vue` - Language switcher component

### Zod Integration
- `nuxt-zod-i18n` module for form validation translations
- `zodI18n` configuration in `nuxt.config.ts`
- Automatic validation message translation

### Form Validation
Translation mapping for validation:
```typescript
zodI18n: {
  localeCodesMapping: {
    'en-GB': 'en',
    'fr-FR': 'fr'
  }
}
```

## Features

### Language Support
- **French (fr)** - Default language
- **English (en)** - Secondary language
- Browser language detection
- Persistent language selection via cookies

### Translation Scope
- All UI components and labels
- Form validation messages
- Error messages
- Navigation items
- Dashboard content
- Recipe and ingredient data
- Filter labels and options

### Technical Features
- Lazy loading of translation files for performance
- No URL prefix strategy (clean URLs)
- Cookie-based language persistence
- Browser language auto-detection
- Server-side rendering support

## Usage Patterns

### In Components
```vue
<template>
  <div>{{ $t('heroPage.title') }}</div>
</template>

<script setup>
const { t } = useI18n();
const translatedText = computed(() => t('some.key'));
</script>
```

### Dynamic Translations
- Computed properties for reactive translations
- Template-based translations with `$t()`
- Pluralization support
- Variable interpolation in translations

## Language Switcher
- Dropdown component for language selection
- Immediate language switching
- Persistent selection across sessions
- Visual feedback for current language

## File Organization
- Structured JSON files with nested keys
- Consistent naming conventions
- Separation of concerns by feature/page
- Shared common translations

## Integration Points
- Authentication forms (login/register)
- Dashboard interfaces
- Recipe creation and viewing
- Filter panels and options
- Error messages and notifications
- Navigation and menus