import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { Ustensil } from '~~/server/utils/drizzleUtils';
import type { UstensilsDashboard } from '~/types/ustensilsDashboard';
import type { UstensilCreation } from '~/schemas/creation/ustensil';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy, useFetchy, useCachedData } from './useAPI';

/**
 * Composable for ustensils API operations
 * @returns Object containing all ustensils API methods
 */
export function useUstensilsRequest() {
  return {
    // ============================================
    // GET - Imperative (fetchy)
    // ============================================

    /**
     * Fetch all ustensils imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of ustensils
     */
    fetchAll(options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ustensil[]> {
      return fetchy<Ustensil[]>(
        `/${ApiResource.USTENSILS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch ustensil by ID imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param id - Ustensil ID
     * @param options - Optional fetch options
     * @returns Promise resolving to ustensil
     */
    fetchById(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ustensil> {
      return fetchy<Ustensil>(
        `/${ApiResource.USTENSILS}/${id}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Fetch ustensils dashboard data imperatively
     * Use in event handlers, callOnce, or any non-SSR context
     * @param options - Optional fetch options
     * @returns Promise resolving to array of dashboard ustensils
     */
    fetchDashboard(options?: NitroFetchOptions<NitroFetchRequest>): Promise<UstensilsDashboard[]> {
      return fetchy<UstensilsDashboard[]>(
        `/${ApiResource.USTENSILS}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - SSR (useFetchy)
    // ============================================

    /**
     * Get all ustensils with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to Ustensil[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getAll<DataTransformT = Ustensil[], DefaultT = undefined>(options?: UseFetchOptions<Ustensil[], DataTransformT, never, DefaultT>) {
      return useFetchy<Ustensil[], DataTransformT, never, DefaultT>(
        `/${ApiResource.USTENSILS}/${ApiEndpoint.ALL}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get ustensil by ID with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to Ustensil)
     * @template DefaultT - The type of the default value
     * @param id - Ustensil ID (can be reactive)
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getById<DataTransformT = Ustensil, DefaultT = undefined>(id: MaybeRef<number>, options?: UseFetchOptions<Ustensil, DataTransformT, never, DefaultT>) {
      return useFetchy<Ustensil, DataTransformT, never, DefaultT>(
        () => `/${ApiResource.USTENSILS}/${unref(id)}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    /**
     * Get ustensils dashboard data with SSR support
     * Use for SSR data loading in components
     * @template DataTransformT - The type of data after transform (defaults to UstensilsDashboard[])
     * @template DefaultT - The type of the default value
     * @param options - Optional useFetch options
     * @returns Nuxt useFetch composable result
     */
    getDashboard<DataTransformT = UstensilsDashboard[], DefaultT = undefined>(options?: UseFetchOptions<UstensilsDashboard[], DataTransformT, never, DefaultT>) {
      return useFetchy<UstensilsDashboard[], DataTransformT, never, DefaultT>(
        `/${ApiResource.USTENSILS}/${ApiEndpoint.DASHBOARD}`,
        { method: HttpMethod.GET, ...options },
      );
    },

    // ============================================
    // GET - Cached (useCachedData)
    // ============================================

    /**
     * Get all ustensils with persistent cache
     * Use for data that needs to be cached and reused across components
     * @param key - Optional cache key (defaults to 'ustensils-all')
     * @param options - Optional async data options
     * @returns Nuxt useAsyncData composable result
     */
    getAllCached(key?: string, options?: AsyncDataOptions<Ustensil[]>) {
      return useCachedData<Ustensil[]>(
        key ?? 'ustensils-all',
        `/${ApiResource.USTENSILS}/${ApiEndpoint.ALL}`,
        { fetchOptions: { method: HttpMethod.GET }, ...options },
      );
    },

    // ============================================
    // POST - Create (fetchy)
    // ============================================

    /**
     * Create a new ustensil
     * @param input - Ustensil creation data
     * @param options - Optional fetch options
     * @returns Promise resolving to created ustensil
     */
    create(input: UstensilCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ustensil> {
      return fetchy<Ustensil>(
        `/${ApiResource.USTENSILS}`,
        { method: HttpMethod.POST, body: input, ...options },
      );
    },

    // ============================================
    // PUT - Update (fetchy)
    // ============================================

    /**
     * Update an existing ustensil
     * @param id - Ustensil ID to update
     * @param input - Ustensil update data
     * @param options - Optional fetch options
     * @returns Promise resolving to updated ustensil
     */
    update(id: number, input: UstensilCreation, options?: NitroFetchOptions<NitroFetchRequest>): Promise<Ustensil> {
      return fetchy<Ustensil>(
        `/${ApiResource.USTENSILS}/${id}`,
        { method: 'PUT', body: input, ...options },
      );
    },

    // ============================================
    // DELETE (fetchy)
    // ============================================

    /**
     * Delete a ustensil by ID
     * @param id - Ustensil ID to delete
     * @param options - Optional fetch options
     * @returns Promise resolving to success status
     */
    delete(id: number, options?: NitroFetchOptions<NitroFetchRequest>): Promise<{ success: boolean }> {
      return fetchy<{ success: boolean }>(
        `/${ApiResource.USTENSILS}/${id}`,
        { method: HttpMethod.DELETE, ...options },
      );
    },
  };
}
