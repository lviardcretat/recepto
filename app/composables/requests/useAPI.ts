import type { UseFetchOptions } from 'nuxt/app';
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';
import type { ICachedDataOptions } from '~/types/cache/requests';

type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>;

/**
 * Get the $api instance for imperative fetching
 * Use in event handlers, callOnce, or any non-SSR context
 * Uses tryUseNuxtApp() to handle async contexts where Nuxt instance may not be available
 */
export function useApiClient(): typeof $fetch {
  const nuxtApp = tryUseNuxtApp();
  if (nuxtApp) {
    return nuxtApp.$api;
  }
  // Fallback: create a $fetch with baseURL when Nuxt context is not available
  return $fetch.create({ baseURL: '/api' });
}

/**
 * Wrapper for useFetch that uses the $api plugin with proper error handling
 * Use for SSR data loading in components
 * @template ResT - The type of data returned by the API
 * @template DataTransformT - The type of data after transform (defaults to ResT)
 * @template DefaultT - The type of the default value
 */
export function useFetchy<
  ResT,
  DataTransformT = ResT,
  PickKeys extends KeysOf<DataTransformT> = KeysOf<DataTransformT>,
  DefaultT = undefined,
>(
  url: NitroFetchRequest | Ref<NitroFetchRequest> | (() => NitroFetchRequest),
  options?: Omit<UseFetchOptions<ResT, DataTransformT, PickKeys, DefaultT>, 'onResponseError'>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useApiClient(),
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  } as UseFetchOptions<ResT, DataTransformT, PickKeys, DefaultT>);
}

/**
 * Generic fetch function for imperative API calls
 * Use in event handlers, callOnce, or any non-SSR context
 */
export async function fetchy<T>(
  url: NitroFetchRequest,
  options?: NitroFetchOptions<NitroFetchRequest>,
): Promise<T> {
  const $api = useApiClient();
  return $api<T>(url, options);
}

/**
 * Wrapper for useAsyncData that caches server data with proper typing and optional TTL
 * Use for data that needs to be cached and reused across components
 * @param key - Unique cache key
 * @param url - API endpoint URL
 * @param options - Options including fetchOptions, optional TTL, and transform
 */
export function useCachedData<ResT>(
  key: string,
  url: NitroFetchRequest,
  options?: ICachedDataOptions<ResT>,
) {
  const { fetchOptions, ttl, default: defaultFn, watch } = options ?? {};
  const $api = useApiClient();
  const nuxtApp = tryUseNuxtApp();
  if (!nuxtApp) {
    throw new Error('useCachedData requires Nuxt context - call it within a Vue setup function');
  }

  // Store timestamps separately using useState (persists across components, not in payload)
  const cacheTimestamps = useState<Record<string, number>>('cache-timestamps', () => ({}));

  // Build getCachedData function based on TTL
  const getCachedData = ttl
    ? (cacheKey: string) => {
        const cached = nuxtApp.payload.data[cacheKey];

        // No cached data
        if (cached === undefined) return undefined;

        // Check TTL expiration
        const timestamp = cacheTimestamps.value[cacheKey];
        if (!timestamp || Date.now() - timestamp > ttl) {
          return undefined;
        }

        // Return raw cached data - transforms should be applied in components via computed
        return cached;
      }
    : undefined;

  const asyncDataOptions: Record<string, unknown> = {
    getCachedData,
  };

  if (defaultFn) asyncDataOptions.default = defaultFn;
  if (watch !== undefined) asyncDataOptions.watch = watch;
  // Don't pass transform to useAsyncData - cache must always store raw data
  // Transforms should be applied in components via computed() to avoid cache conflicts

  return useAsyncData(
    key,
    async () => {
      const data = await $api<ResT>(url, fetchOptions);
      // Update timestamp when data is fetched
      if (ttl) {
        cacheTimestamps.value[key] = Date.now();
      }
      return data;
    },
    asyncDataOptions,
  ) as ReturnType<typeof useAsyncData<ResT>>;
}
