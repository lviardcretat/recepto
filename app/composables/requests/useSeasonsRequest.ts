import type { UseFetchOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Season } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';
import type { ICachedDataOptions } from '~/types/cache/requests';

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
     * @template DataTransformT - The type of data after transform (defaults to Season[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = Season[], DefaultT = undefined>(options?: UseFetchOptions<Season[], DataTransformT, never, DefaultT>) {
      return useFetchy<Season[], DataTransformT, never, DefaultT>(
        `/${ApiResource.SEASONS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all seasons with persistent cache and TTL (24 hours - static data)
     * Use for data that needs to be cached and reused across components
     * Note: Use computed() in components to transform data (e.g., to SelectMenuItem[])
     * @param options - Optional cached data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(options?: Omit<ICachedDataOptions<Season[]>, 'fetchOptions' | 'ttl'>) {
      return useCachedData<Season[]>(
        'seasons-all',
        `/${ApiResource.SEASONS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ttl: 86400000, ...options }, // TTL: 24 hours (static data)
      );
    },
  };
}
