import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { HttpMethod, ApiResource, ApiEndpoint } from '~/enums/api';
import { fetchy } from './useAPI';

/**
 * Auth response type
 */
export interface AuthResponse {
  success: boolean;
  error?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Register credentials
 */
export interface RegisterCredentials {
  username: string;
  password: string;
}

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
    login(credentials: LoginCredentials, options?: NitroFetchOptions<NitroFetchRequest>): Promise<AuthResponse> {
      return fetchy<AuthResponse>(
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
    register(credentials: RegisterCredentials, options?: NitroFetchOptions<NitroFetchRequest>): Promise<AuthResponse> {
      return fetchy<AuthResponse>(
        `/${ApiResource.AUTH}/${ApiEndpoint.REGISTER}`,
        { method: HttpMethod.POST, body: credentials, ...options },
      );
    },

    /**
     * Login as guest
     * @param options - Optional fetch options
     * @returns Promise resolving to auth response
     */
    loginAsGuest(options?: NitroFetchOptions<NitroFetchRequest>): Promise<AuthResponse> {
      return fetchy<AuthResponse>(
        `/${ApiResource.AUTH}/${ApiEndpoint.GUEST}`,
        { method: HttpMethod.POST, ...options },
      );
    },
  };
}
