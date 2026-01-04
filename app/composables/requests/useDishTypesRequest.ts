import type { UseFetchOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { DishType } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';
import type { ICachedDataOptions } from '~/types/cache/requests';

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
     * @template DataTransformT - The type of data after transform (defaults to DishType[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = DishType[], DefaultT = undefined>(options?: UseFetchOptions<DishType[], DataTransformT, never, DefaultT>) {
      return useFetchy<DishType[], DataTransformT, never, DefaultT>(
        `/${ApiResource.DISH_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all dish types with persistent cache and TTL (1 hour)
     * Use for data that needs to be cached and reused across components
     * Note: Use computed() in components to transform data (e.g., to SelectMenuItem[])
     * @param options - Optional cached data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(options?: Omit<ICachedDataOptions<DishType[]>, 'fetchOptions' | 'ttl'>) {
      return useCachedData<DishType[]>(
        'dishTypes-all',
        `/${ApiResource.DISH_TYPES}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ttl: 3600000, ...options }, // TTL: 1 hour
      );
    },
  };
}
