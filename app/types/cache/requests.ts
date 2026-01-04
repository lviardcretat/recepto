import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';

/**
 * Options for useCachedData composable
 * Note: transform is intentionally not supported - use computed() in components instead
 * to avoid cache conflicts when multiple components share the same cache key
 */
export interface ICachedDataOptions<ResT> {
  /** Fetch options passed to $api */
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>;
  /** TTL in milliseconds (optional). When set, cache is invalidated after TTL expires */
  ttl?: number;
  /** Default value when data is not yet available */
  default?: () => ResT | null;
  /** Watch for changes */
  watch?: false | unknown[];
}
