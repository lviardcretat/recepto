declare module '#auth-utils' {
  interface User {
    id: number | string;
    username: string;
    isAnonymous: boolean;
  }

  interface UserSession {
    user?: User;
  }
}

export {};
