import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import type { IAuthResponse, ILoginCredentials, IRegisterCredentials } from '~/types/auth/credentials';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy } from './useAPI';

/**
 * Composable for auth API operations
 * @returns Object containing all auth API methods
 */
export function useAuthRequest() {
  return {
    // ============================================
    // POST - Auth operations (fetchy)
    // ============================================

    /**
     * Login with username and password
     * @param credentials - Login credentials (username and password)
     * @param options - Optional fetch options
     * @returns Promise resolving to auth response
     */
    login(credentials: ILoginCredentials, options?: NitroFetchOptions<NitroFetchRequest>): Promise<IAuthResponse> {
      return fetchy<IAuthResponse>(
        `/${ApiResource.AUTH}/${ApiEndpoint.LOGIN}`,
        { method: HttpMethod.POST, body: credentials, ...options },
      );
    },

    /**
     * Register a new user
     * @param credentials - Register credentials (username and password)
     * @param options - Optional fetch options
     * @returns Promise resolving to auth response
     */
    register(credentials: IRegisterCredentials, options?: NitroFetchOptions<NitroFetchRequest>): Promise<IAuthResponse> {
      return fetchy<IAuthResponse>(
        `/${ApiResource.AUTH}/${ApiEndpoint.REGISTER}`,
        { method: HttpMethod.POST, body: credentials, ...options },
      );
    },

    /**
     * Login as guest
     * @param options - Optional fetch options
     * @returns Promise resolving to auth response
     */
    loginAsGuest(options?: NitroFetchOptions<NitroFetchRequest>): Promise<IAuthResponse> {
      return fetchy<IAuthResponse>(
        `/${ApiResource.AUTH}/${ApiEndpoint.GUEST}`,
        { method: HttpMethod.POST, ...options },
      );
    },
  };
}
