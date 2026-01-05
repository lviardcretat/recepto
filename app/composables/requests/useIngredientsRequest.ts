import type { UseFetchOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Ingredient } from '~~/server/utils/drizzleUtils';
import type { IIngredientsDashboard } from '~/types/ingredient/dashboard';
import type { ISeasonalDataRecord } from '~/types/ingredient/seasonal';
import type { IngredientCreationSchema } from '~/schemas/creation/ingredient';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';
import type { ICachedDataOptions } from '~/types/cache/requests';

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
    fetchDashboard(options?: NitroFetchOptions<NitroFetchRequest>): Promise<IIngredientsDashboard[]> {
      return fetchy<IIngredientsDashboard[]>(
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
    fetchSeasonals(options?: NitroFetchOptions<NitroFetchRequest>): Promise<ISeasonalDataRecord[]> {
      return fetchy<ISeasonalDataRecord[]>(
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
     * @template DataTransformT - The type of data after transform (defaults to Ingredient[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = Ingredient[], DefaultT = undefined>(options?: UseFetchOptions<Ingredient[], DataTransformT, never, DefaultT>) {
      return useFetchy<Ingredient[], DataTransformT, never, DefaultT>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get ingredient by ID with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to Ingredient)
     * @template DefaultT - The type of the default value
     * @param id - Ingredient ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getById<DataTransformT = Ingredient, DefaultT = undefined>(id: MaybeRef<number>, options?: UseFetchOptions<Ingredient, DataTransformT, never, DefaultT>) {
      return useFetchy<Ingredient, DataTransformT, never, DefaultT>(
        () => `/${ApiResource.INGREDIENTS}/${unref(id)}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get ingredients dashboard data with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to IIngredientsDashboard[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getDashboard<DataTransformT = IIngredientsDashboard[], DefaultT = undefined>(options?: UseFetchOptions<IIngredientsDashboard[], DataTransformT, never, DefaultT>) {
      return useFetchy<IIngredientsDashboard[], DataTransformT, never, DefaultT>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get seasonal ingredients data with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to ISeasonalDataRecord[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getSeasonals<DataTransformT = ISeasonalDataRecord[], DefaultT = undefined>(options?: UseFetchOptions<ISeasonalDataRecord[], DataTransformT, never, DefaultT>) {
      return useFetchy<ISeasonalDataRecord[], DataTransformT, never, DefaultT>(
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.SEASONALS}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all ingredients with persistent cache and TTL (10 minutes)
     * Use for data that needs to be cached and reused across components
     * Note: Use computed() in components to transform data (e.g., to SelectMenuItem[])
     * @param options - Optional cached data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(options?: Omit<ICachedDataOptions<Ingredient[]>, 'fetchOptions' | 'ttl'>) {
      return useCachedData<Ingredient[]>(
        'ingredients-all',
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ttl: 600000, ...options }, // TTL: 10 minutes
      );
    },

    /**
     * Get seasonal ingredients data with persistent cache and TTL (24 hours)
     * Use for data that needs to be cached and reused across components
     * @template DataTransformT - The type of data after transform (defaults to ISeasonalDataRecord[])
     * @param options - Optional cached data options including transform
     * @returns Nuxt useAsyncData composable result
     */
    getSeasonalsCached(options?: Omit<ICachedDataOptions<ISeasonalDataRecord[]>, 'fetchOptions' | 'ttl'>) {
      return useCachedData<ISeasonalDataRecord[]>(
        'ingredients-seasonals',
        `/${ApiResource.INGREDIENTS}/${ApiEndpoint.SEASONALS}`,
        { fetchOptions: { method: HttpMethod.GET }, ttl: 86400000, ...options }, // TTL: 24 hours
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
    create(input: IngredientCreationSchema, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ingredient> {
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
    update(id: number, input: IngredientCreationSchema, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ingredient> {
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
