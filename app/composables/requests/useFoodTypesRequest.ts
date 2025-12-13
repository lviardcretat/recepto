import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { FoodType } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for food types API operations
 * @returns Object containing all food types API methods
 */
export function useFoodTypesRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all food types imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of food types
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<FoodType[]> {
      return fetchy<FoodType[]>(
        `/${ApiResource.FOOD_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all food types with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll(options?: UseFetchOptions<FoodType[]>) {
      return useFetchy<FoodType[]>(
        `/${ApiResource.FOOD_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all food types with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'foodTypes-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<FoodType[]>) {
      return useCachedData<FoodType[]>(
        key ?? 'foodTypes-all',
        `/${ApiResource.FOOD_TYPES}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },
  };
}
