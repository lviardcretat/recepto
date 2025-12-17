/**
 * Login credentials
 */
export interface ILoginCredentials {
  username: string;
  password: string;
}

/**
 * Register credentials
 */
export interface IRegisterCredentials {
  username: string;
  password: string;
}

/**
 * Auth response type
 */
export interface IAuthResponse {
  success: boolean;
  error?: string;
}
