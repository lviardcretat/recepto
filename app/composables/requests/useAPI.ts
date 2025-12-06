import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';

/**
 * Get the $api instance for imperative fetching
 * Use in event handlers, callOnce, or any non-SSR context
 */
export function useApiClient(): typeof $fetch {
  const { $api } = useNuxtApp();
  return $api;
}

/**
 * Wrapper for useFetch that uses the $api plugin with proper error handling
 * Use for SSR data loading in components
 */
export function useFetchy<T>(
  url: NitroFetchRequest | Ref<NitroFetchRequest> | (() => NitroFetchRequest),
  options?: Omit<UseFetchOptions<T>, 'onResponseError'>,
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
  } as UseFetchOptions<T>);
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
 * Options for useCachedData composable
 */
interface UseCachedDataOptions<T> extends AsyncDataOptions<T> {
  /** Fetch options passed to $api */
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>;
}

/**
 * Wrapper for useAsyncData that caches server data with proper typing
 * Use for data that needs to be cached and reused across components
 */
export function useCachedData<T>(
  key: string,
  url: NitroFetchRequest,
  options?: UseCachedDataOptions<T>,
) {
  const { fetchOptions, ...asyncDataOptions } = options ?? {};
  const $api = useApiClient();

  return useAsyncData<T>(
    key,
    () => $api<T>(url, fetchOptions),
    asyncDataOptions,
  );
}
