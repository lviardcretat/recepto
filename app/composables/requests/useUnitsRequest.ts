import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Unit } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for units API operations
 * @returns Object containing all units API methods
 */
export function useUnitsRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all units imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of units
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<Unit[]> {
      return fetchy<Unit[]>(
        `/${ApiResource.UNITS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all units with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to Unit[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = Unit[], DefaultT = undefined>(options?: UseFetchOptions<Unit[], DataTransformT, never, DefaultT>) {
      return useFetchy<Unit[], DataTransformT, never, DefaultT>(
        `/${ApiResource.UNITS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all units with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'units-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<Unit[]>) {
      return useCachedData<Unit[]>(
        key ?? 'units-all',
        `/${ApiResource.UNITS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },
  };
}
