import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { MealType } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for meal types API operations
 * @returns Object containing all meal types API methods
 */
export function useMealTypesRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all meal types imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of meal types
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<MealType[]> {
      return fetchy<MealType[]>(
        `/${ApiResource.MEAL_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all meal types with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to MealType[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = MealType[], DefaultT = undefined>(options?: UseFetchOptions<MealType[], DataTransformT, never, DefaultT>) {
      return useFetchy<MealType[], DataTransformT, never, DefaultT>(
        `/${ApiResource.MEAL_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all meal types with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'mealTypes-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<MealType[]>) {
      return useCachedData<MealType[]>(
        key ?? 'mealTypes-all',
        `/${ApiResource.MEAL_TYPES}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },
  };
}
