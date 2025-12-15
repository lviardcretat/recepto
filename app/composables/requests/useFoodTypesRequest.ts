import type { UseFetchOptions } from 'nuxt/app';
import type { FoodType } from '~~/server/utils/drizzleUtils';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy } from './useAPI';

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
     * @returns Promise resolving to array of food types
     */
    fetchAll(): Promise<FoodType[]> {
      return fetchy<FoodType[]>(
        `/${ApiResource.FOOD_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all food types with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to FoodType[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = FoodType[], DefaultT = undefined>(options?: UseFetchOptions<FoodType[], DataTransformT, never, DefaultT>) {
      return useFetchy<FoodType[], DataTransformT, never, DefaultT>(
        `/${ApiResource.FOOD_TYPES}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },
  };
}
