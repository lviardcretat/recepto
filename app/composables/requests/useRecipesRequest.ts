import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Recipe } from '~~/server/utils/drizzleUtils';
import type { IRecipeDetail, IRecipeWithAllData, IRecipeWithLessData } from '~/types/recipe/detail';
import type { IRecipesDashboard } from '~/types/recipe/dashboard';
import type { IFetchRecipesQuery } from '~/types/recipe/filter';
import type { RecipeCreation } from '~/schemas/creation/recipe';
import { ApiResource, ApiEndpoint, HttpMethod } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

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
    fetchById(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<IRecipeDetail> {
      return fetchy<IRecipeDetail>(
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
    fetchByIdForEdit(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<IRecipeWithAllData> {
      return fetchy<IRecipeWithAllData>(
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
    fetchDashboard(options?: NitroFetchOptions<NitroFetchRequest>): Promise<IRecipesDashboard[]> {
      return fetchy<IRecipesDashboard[]>(
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
    fetchFiltered(query: IFetchRecipesQuery, options?: NitroFetchOptions<NitroFetchRequest>): Promise<IRecipeWithLessData[]> {
      return fetchy<IRecipeWithLessData[]>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.FILTERED}`,
        {
          method: HttpMethod.GET,
          query: query,
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
     * @template DataTransformT - The type of data after transform (defaults to Recipe[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = Recipe[], DefaultT = undefined>(options?: UseFetchOptions<Recipe[], DataTransformT, never, DefaultT>) {
      return useFetchy<Recipe[], DataTransformT, never, DefaultT>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipe by ID with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IRecipeDetail)
     * @template DefaultT - The type of the default value
     * @param id - Recipe ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getById<DataTransformT = IRecipeDetail, DefaultT = undefined>(id: MaybeRef<number>, options?: UseFetchOptions<IRecipeDetail, DataTransformT, never, DefaultT>) {
      return useFetchy<IRecipeDetail, DataTransformT, never, DefaultT>(
        () => `/${ApiResource.RECIPES}/${unref(id)}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipe by ID for editing with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IRecipeWithAllData)
     * @template DefaultT - The type of the default value
     * @param id - Recipe ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getByIdForEdit<DataTransformT = IRecipeWithAllData, DefaultT = undefined>(id: MaybeRef<number>, options?: UseFetchOptions<IRecipeWithAllData, DataTransformT, never, DefaultT>) {
      return useFetchy<IRecipeWithAllData, DataTransformT, never, DefaultT>(
        () => `/${ApiResource.RECIPES}/${unref(id)}?edit=true`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipes dashboard data with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IRecipesDashboard[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getDashboard<DataTransformT = IRecipesDashboard[], DefaultT = undefined>(options?: UseFetchOptions<IRecipesDashboard[], DataTransformT, never, DefaultT>) {
      return useFetchy<IRecipesDashboard[], DataTransformT, never, DefaultT>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get filtered recipes with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IRecipeWithLessData[])
     * @template DefaultT - The type of the default value
     * @param params - Filter parameters
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getFiltered<DataTransformT = IRecipeWithLessData[], DefaultT = undefined>(query: IFetchRecipesQuery, options?: UseFetchOptions<IRecipeWithLessData[], DataTransformT, never, DefaultT>) {
      return useFetchy<IRecipeWithLessData[], DataTransformT, never, DefaultT>(
        `/${ApiResource.RECIPES}/${ApiEndpoint.FILTERED}`,
        {
          method: HttpMethod.GET,
          query: query,
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
