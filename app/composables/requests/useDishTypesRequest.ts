import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { DishType } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for dish types API operations
 * @returns Object containing all dish types API methods
 */
export function useDishTypesRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all dish types imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of dish types
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<DishType[]> {
      return fetchy<DishType[]>(
        `/${ApiResource.DISH_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all dish types with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll(options?: UseFetchOptions<DishType[]>) {
      return useFetchy<DishType[]>(
        `/${ApiResource.DISH_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all dish types with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'dishTypes-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<DishType[]>) {
      return useCachedData<DishType[]>(
        key ?? 'dishTypes-all',
        `/${ApiResource.DISH_TYPES}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },
  };
}
