import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { RecipesCategory } from '~~/server/utils/drizzleUtils';
import type { IFetchRecipesCategoriesQuery } from '~/types/recipesCategory/filter';
import type { IRecipesCategoriesWithLessData, IRecipeSearched } from '~/types/recipesCategory/detail';
import type { RecipesCategoryCreation } from '~/schemas/creation/recipesCategory';
import { ApiResource, ApiEndpoint, HttpMethod } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for recipes categories API operations
 * @returns Object containing all recipes categories API methods
 */
export function useRecipesCategoriesRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all recipes categories imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of recipes categories
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipesCategory[]> {
      return fetchy<RecipesCategory[]>(
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch recipes category by ID imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param id - Recipes category ID
     * @param options - Optional fetch options
     * @returns Promise resolving to recipes category
     */
    fetchById(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipesCategory> {
      return fetchy<RecipesCategory>(
        `/${ApiResource.RECIPES_CATEGORIES}/${id}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch filtered recipes categories imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param params - Filter parameters
     * @param options - Optional fetch options
     * @returns Promise resolving to array of filtered recipes categories
     */
    fetchFiltered(query: IFetchRecipesCategoriesQuery, options?: NitroFetchOptions<NitroFetchRequest>): Promise<IRecipesCategoriesWithLessData[]> {
      return fetchy<IRecipesCategoriesWithLessData[]>(
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.FILTERED}`,
        {
          method: HttpMethod.GET,
          query: query,
          ...options,
        },
      );
    },

    /**
     * Fetch search results imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of searched recipes
     */
    fetchSearch(options?: NitroFetchOptions<NitroFetchRequest>): Promise<IRecipeSearched[]> {
      return fetchy<IRecipeSearched[]>(
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.SEARCH}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all recipes categories with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to RecipesCategory[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = RecipesCategory[], DefaultT = undefined>(options?: UseFetchOptions<RecipesCategory[], DataTransformT, never, DefaultT>) {
      return useFetchy<RecipesCategory[], DataTransformT, never, DefaultT>(
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get recipes category by ID with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to RecipesCategory)
     * @template DefaultT - The type of the default value
     * @param id - Recipes category ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getById<DataTransformT = RecipesCategory, DefaultT = undefined>(id: MaybeRef<number>, options?: UseFetchOptions<RecipesCategory, DataTransformT, never, DefaultT>) {
      return useFetchy<RecipesCategory, DataTransformT, never, DefaultT>(
        () => `/${ApiResource.RECIPES_CATEGORIES}/${unref(id)}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get filtered recipes categories with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IRecipesCategoriesWithLessData[])
     * @template DefaultT - The type of the default value
     * @param params - Filter parameters
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getFiltered<DataTransformT = IRecipesCategoriesWithLessData[], DefaultT = undefined>(query: IFetchRecipesCategoriesQuery, options?: UseFetchOptions<IRecipesCategoriesWithLessData[], DataTransformT, never, DefaultT>) {
      return useFetchy<IRecipesCategoriesWithLessData[], DataTransformT, never, DefaultT>(
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.FILTERED}`,
        {
          method: HttpMethod.GET,
          query: query,
          ...options,
        },
      );
    },

    /**
     * Get search results with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IRecipeSearched[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getSearch<DataTransformT = IRecipeSearched[], DefaultT = undefined>(query: any, options?: UseFetchOptions<IRecipeSearched[], DataTransformT, never, DefaultT>) {
      return useFetchy<IRecipeSearched[], DataTransformT, never, DefaultT>(
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.SEARCH}`,
        { method: HttpMethod.GET, query: query, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all recipes categories with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'recipesCategories-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<RecipesCategory[]>) {
      return useCachedData<RecipesCategory[]>(
        key ?? 'recipesCategories-all',
        `/${ApiResource.RECIPES_CATEGORIES}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },

    // ============================================
    // POST - Create (fetchy)
    // ============================================

    /**
     * Create a new recipes category
     * @param input - Recipes category creation data
     * @param options - Optional fetch options
     * @returns Promise resolving to created recipes category
     */
    create(input: RecipesCategoryCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipesCategory> {
      return fetchy<RecipesCategory>(
        `/${ApiResource.RECIPES_CATEGORIES}`,
        { method: HttpMethod.POST, body: input, ...options },
      );
    },

    // ============================================
    // PUT - Update (fetchy)
    // ============================================

    /**
     * Update an existing recipes category
     * @param id - Recipes category ID to update
     * @param input - Recipes category update data
     * @param options - Optional fetch options
     * @returns Promise resolving to updated recipes category
     */
    update(id: number, input: RecipesCategoryCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<RecipesCategory> {
      return fetchy<RecipesCategory>(
        `/${ApiResource.RECIPES_CATEGORIES}/${id}`,
        { method: 'PUT', body: input, ...options },
      );
    },

    // ============================================
    // DELETE (fetchy)
    // ============================================

    /**
     * Delete a recipes category by ID
     * @param id - Recipes category ID to delete
     * @param options - Optional fetch options
     * @returns Promise resolving to success status
     */
    delete(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<{ success: boolean }> {
      return fetchy<{ success: boolean }>(
        `/${ApiResource.RECIPES_CATEGORIES}/${id}`,
        { method: HttpMethod.DELETE, ...options },
      );
    },
  };
}
