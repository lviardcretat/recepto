import type { HookResult } from 'nuxt/schema';

declare module '#app' {
  interface RuntimeNuxtHooks {
    'ingredient:created': (payload: { id: number }) => HookResult;
    'recipesCategory:created': (payload: { id: number }) => HookResult;
    'ustensil:created': (payload: { id: number }) => HookResult;
    'recipe:created': (payload: any) => HookResult;
  }
}
