import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Ingredient } from '~~/server/utils/drizzleUtils';
import type { IngredientsDashboard } from '~/types/ingredientsDashboard';
import type { IngredientCreation } from '~/schemas/creation/ingredient';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Seasonal data record type for ingredient seasonality
 */
export interface SeasonalDataRecord {
  name: string;
  startMonth: number;
  endMonth: number;
  typeId: number;
  inactive: boolean;
}

/**
 * Composable for ingredients API operations
 * @returns Object containing all ingredients API methods
 */
export function useIngredientsRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all ingredients imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of ingredients
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ingredient[]> {
      return fetchy<Ingredient[]>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch ingredient by ID imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param id - Ingredient ID
     * @param options - Optional fetch options
     * @returns Promise resolving to ingredient
     */
    fetchById(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ingredient> {
      return fetchy<Ingredient>(
        `/${ApiResource.INGREDIENTS}/${id}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch ingredients dashboard data imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of dashboard ingredients
     */
    fetchDashboard(options?: NitroFetchOptions<NitroFetchRequest>): Promise<IngredientsDashboard[]> {
      return fetchy<IngredientsDashboard[]>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch seasonal ingredients data imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of seasonal data records
     */
    fetchSeasonals(options?: NitroFetchOptions<NitroFetchRequest>): Promise<SeasonalDataRecord[]> {
      return fetchy<SeasonalDataRecord[]>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.SEASONALS}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all ingredients with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll(options?: UseFetchOptions<Ingredient[]>) {
      return useFetchy<Ingredient[]>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get ingredient by ID with SSR support
     * Use for SSR data loading in components
     * @param id - Ingredient ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getById(id: MaybeRef<number>, options?: UseFetchOptions<Ingredient>) {
      return useFetchy<Ingredient>(
        () => `/${ApiResource.INGREDIENTS}/${unref(id)}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get ingredients dashboard data with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getDashboard(options?: UseFetchOptions<IngredientsDashboard[]>) {
      return useFetchy<IngredientsDashboard[]>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get seasonal ingredients data with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getSeasonals(options?: UseFetchOptions<SeasonalDataRecord[]>) {
      return useFetchy<SeasonalDataRecord[]>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.SEASONALS}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all ingredients with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'ingredients-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<Ingredient[]>) {
      return useCachedData<Ingredient[]>(
        key ?? 'ingredients-all',
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },

    // ============================================
    // POST - Create (fetchy)
    // ============================================

    /**
     * Create a new ingredient
     * @param input - Ingredient creation data
     * @param options - Optional fetch options
     * @returns Promise resolving to created ingredient
     */
    create(input: IngredientCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ingredient> {
      return fetchy<Ingredient>(
        `/${ApiResource.INGREDIENTS}`,
        { method: HttpMethod.POST, body: input, ...options },
      );
    },

    // ============================================
    // PUT - Update (fetchy)
    // ============================================

    /**
     * Update an existing ingredient
     * @param id - Ingredient ID to update
     * @param input - Ingredient update data
     * @param options - Optional fetch options
     * @returns Promise resolving to updated ingredient
     */
    update(id: number, input: IngredientCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ingredient> {
      return fetchy<Ingredient>(
        `/${ApiResource.INGREDIENTS}/${id}`,
        { method: 'PUT', body: input, ...options },
      );
    },

    // ============================================
    // DELETE (fetchy)
    // ============================================

    /**
     * Delete an ingredient by ID
     * @param id - Ingredient ID to delete
     * @param options - Optional fetch options
     * @returns Promise resolving to success status
     */
    delete(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<{ success: boolean }> {
      return fetchy<{ success: boolean }>(
        `/${ApiResource.INGREDIENTS}/${id}`,
        { method: HttpMethod.DELETE, ...options },
      );
    },
  };
}
