import type { RouteLocationNormalizedGeneric } from 'vue-router';
// import { authClient } from '~/utils/auth-client';

export default defineNuxtRouteMiddleware(
  async (
    to: RouteLocationNormalizedGeneric,
    _from: RouteLocationNormalizedGeneric,
  ) => {
    const { data: session } = await authClient.useSession(useFetch);
    const isNavigatingToLoginOrRegister = to.path === '/' || to.path === '/login';

    if (!isNavigatingToLoginOrRegister && !session.value) {
      return await navigateTo('/login');
    }

    if (isNavigatingToLoginOrRegister && session.value) {
      return await navigateTo('/recipes/all');
    }

    // Restrict access for anonymous users
    /* if (session.value?.user.role === 'anonymous') {
      const restrictedPaths = [
        '/dashboard',
        '/settings',
        '/user',
        '/recipes/create',
        '/ingredients/create',
        '/utensils/create',
        '/categories/create',
      ];

      const isRestrictedPath = restrictedPaths.some(path =>
        to.path.startsWith(path)
      );

      if (isRestrictedPath) {
        return await navigateTo('/recipes/all');
      }
    } */
  },
);
