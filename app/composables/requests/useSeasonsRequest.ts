import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Season } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for seasons API operations
 * @returns Object containing all seasons API methods
 */
export function useSeasonsRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all seasons imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of seasons
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<Season[]> {
      return fetchy<Season[]>(
        `/${ApiResource.SEASONS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all seasons with SSR support
     * Use for SSR data loading in components
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll(options?: UseFetchOptions<Season[]>) {
      return useFetchy<Season[]>(
        `/${ApiResource.SEASONS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all seasons with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'seasons-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<Season[]>) {
      return useCachedData<Season[]>(
        key ?? 'seasons-all',
        `/${ApiResource.SEASONS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },
  };
}
