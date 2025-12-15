import type { UseFetchOptions, AsyncDataOptions } from 'nuxt/app';
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';

type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>;

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
