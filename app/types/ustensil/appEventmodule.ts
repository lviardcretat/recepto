import type { HookResult } from 'nuxt/schema';

declare module '#app' {
  interface RuntimeNuxtHooks {
    'ingredient:created': (payload: { id: number }) => HookResult;
    'ingredient:updated': (payload: { id: number }) => HookResult;
    'ingredient:deleted': (payload: { id: number }) => HookResult;
    'recipesCategory:created': (payload: { id: number }) => HookResult;
    'recipesCategory:updated': (payload: { id: number }) => HookResult;
    'recipesCategory:deleted': (payload: { id: number }) => HookResult;
    'ustensil:created': (payload: { id: number }) => HookResult;
    'ustensil:updated': (payload: { id: number }) => HookResult;
    'ustensil:deleted': (payload: { id: number }) => HookResult;
    'recipe:created': (payload: any) => HookResult;
    'recipe:updated': (payload: { id: number }) => HookResult;
    'recipe:deleted': (payload: { id: number }) => HookResult;
  }
}
