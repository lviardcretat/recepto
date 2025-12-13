import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Recipe } from '~~/server/utils/drizzleUtils';
import type { RecipeDetail } from '~/types/recipeCard';
import type { RecipesDashboard } from '~/types/recipesDashboard';
import type { RecipeWithLessData } from '~/types/filter';
import type { RecipeCreation } from '~/schemas/creation/recipe';
import { ApiResource, ApiEndpoint, HttpMethod } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Recipe with all data for editing
 */
export interface RecipeWithAllData extends Recipe {
  ingredients: { ingredientId: number; quantity: number; unitId?: number }[];
  sequences: { name: string; extra?: string }[];
  allergens: number[];
  ustensils: number[];
}

/**
 * Filter params for recipes
 */
export interface RecipesFilterParams {
  ingredients: { wanted: number[]; notWanted: number[] };
  ustensils: { wanted: number[]; notWanted: number[] };
  allergens: number[];
  seasonalRecipes: boolean;
  recipeCategoryId: string | number;
}

/**
 * Composable for recipes API operations
 * @returns Object containing all recipes API methods
 */
export function useRecipesRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all recipes imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of recipes
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<Recipe[]> {
      return fetchy<Recipe[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch recipe by ID imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param id - Recipe ID
     * @param options - Optional fetch options
     * @returns Promise resolving to recipe detail
     */
    fetchById(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipeDetail> {
      return fetchy<RecipeDetail>(
        `/${ApiResource.RECIPES}/${id}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch recipe by ID for editing imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param id - Recipe ID
     * @param options - Optional fetch options
     * @returns Promise resolving to recipe with all data
     */
    fetchByIdForEdit(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipeWithAllData> {
      return fetchy<RecipeWithAllData>(
        `/${ApiResource.RECIPES}/${id}?edit=true`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch recipes dashboard data imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of dashboard recipes
     */
    fetchDashboard(options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipesDashboard[]> {
      return fetchy<RecipesDashboard[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch filtered recipes imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param params - Filter parameters
     * @param options - Optional fetch options
     * @returns Promise resolving to array of filtered recipes
     */
    fetchFiltered(params: RecipesFilterParams, options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipeWithLessData[]> {
      return fetchy<RecipeWithLessData[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.FILTERED}`,
        {
          method: HttpMethod.GET,
          query: {
            ingredients: JSON.stringify(params.ingredients),
            ustensils: JSON.stringify(params.ustensils),
            allergens: params.allergens,
            seasonalRecipes: params.seasonalRecipes.toString(),
            recipeCategoryId: params.recipeCategoryId.toString(),
          },
          ...options,
        },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all recipes with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll(options?: UseFetchOptions<Recipe[]>) {
      return useFetchy<Recipe[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipe by ID with SSR support
     * Use for SSR data loading in components
     * @param id - Recipe ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getById(id: MaybeRef<number>, options?: UseFetchOptions<RecipeDetail>) {
      return useFetchy<RecipeDetail>(
        () => `/${ApiResource.RECIPES}/${unref(id)}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipe by ID for editing with SSR support
     * Use for SSR data loading in components
     * @param id - Recipe ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getByIdForEdit(id: MaybeRef<number>, options?: UseFetchOptions<RecipeWithAllData>) {
      return useFetchy<RecipeWithAllData>(
        () => `/${ApiResource.RECIPES}/${unref(id)}?edit=true`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipes dashboard data with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getDashboard(options?: UseFetchOptions<RecipesDashboard[]>) {
      return useFetchy<RecipesDashboard[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get filtered recipes with SSR support
     * Use for SSR data loading in components
     * @param params - Filter parameters
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getFiltered(params: RecipesFilterParams, options?: UseFetchOptions<RecipeWithLessData[]>) {
      return useFetchy<RecipeWithLessData[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.FILTERED}`,
        {
          method: HttpMethod.GET,
          query: {
            ingredients: JSON.stringify(params.ingredients),
            ustensils: JSON.stringify(params.ustensils),
            allergens: params.allergens,
            seasonalRecipes: params.seasonalRecipes.toString(),
            recipeCategoryId: params.recipeCategoryId.toString(),
          },
          ...options,
        },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all recipes with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'recipes-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<Recipe[]>) {
      return useCachedData<Recipe[]>(
        key ?? 'recipes-all',
        `/${ApiResource.RECIPES}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },

    // ============================================
    // POST - Create (fetchy)
    // ============================================

    /**
     * Create a new recipe
     * @param input - Recipe creation data
     * @param options - Optional fetch options
     * @returns Promise resolving to void
     */
    create(input: RecipeCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<void> {
      return fetchy<void>(
        `/${ApiResource.RECIPES}`,
        { method: HttpMethod.POST, body: input, ...options },
      );
    },

    // ============================================
    // PUT - Update (fetchy)
    // ============================================

    /**
     * Update an existing recipe
     * @param id - Recipe ID to update
     * @param input - Recipe update data
     * @param options - Optional fetch options
     * @returns Promise resolving to updated recipe
     */
    update(id: number, input: RecipeCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Recipe> {
      return fetchy<Recipe>(
        `/${ApiResource.RECIPES}/${id}`,
        { method: 'PUT', body: input, ...options },
      );
    },

    // ============================================
    // DELETE (fetchy)
    // ============================================

    /**
     * Delete a recipe by ID
     * @param id - Recipe ID to delete
     * @param options - Optional fetch options
     * @returns Promise resolving to success status
     */
    delete(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<{ success: boolean }> {
      return fetchy<{ success: boolean }>(
        `/${ApiResource.RECIPES}/${id}`,
        { method: HttpMethod.DELETE, ...options },
      );
    },
  };
}
