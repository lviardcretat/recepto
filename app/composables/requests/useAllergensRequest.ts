import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Allergen } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for allergens API operations
 * @returns Object containing all allergens API methods
 */
export function useAllergensRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all allergens imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of allergens
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<Allergen[]> {
      return fetchy<Allergen[]>(
        `/${ApiResource.ALLERGENS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all allergens with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to Allergen[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = Allergen[], DefaultT = undefined>(options?: UseFetchOptions<Allergen[], DataTransformT, never, DefaultT>) {
      return useFetchy<Allergen[], DataTransformT, never, DefaultT>(
        `/${ApiResource.ALLERGENS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all allergens with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'allergens-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<Allergen[]>) {
      return useCachedData<Allergen[]>(
        key ?? 'allergens-all',
        `/${ApiResource.ALLERGENS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },
  };
}
