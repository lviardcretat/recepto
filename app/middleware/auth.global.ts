import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { authClient } from '~/utils/auth-client';

export default defineNuxtRouteMiddleware(
  async (
    to: RouteLocationNormalizedGeneric,
    _from: RouteLocationNormalizedGeneric,
  ) => {
    const { data: session } = await authClient.useSession(useFetch);
    const isNavigatingToLoginOrRegister = to.path === '/' || to.path === '/login';

    // Pages qui nécessitent une authentification complète (pas anonyme)
    const restrictedPaths = [
      '/profile',
      '/recipes/create',
      '/recipes/edit',
      '/ingredients/create',
      '/ingredients/edit',
      '/categories/create',
      '/categories/edit',
      '/utensils/create',
      '/utensils/edit',
    ];

    const isRestrictedPath = restrictedPaths.some(path => to.path.startsWith(path));

    // Si pas de session du tout, rediriger vers login
    if (!session.value && !isNavigatingToLoginOrRegister) {
      return await navigateTo('/login');
    }

    // Si utilisateur anonyme essaie d'accéder à une page restreinte
    if (session.value?.user?.isAnonymous && isRestrictedPath) {
      // Rediriger vers login avec un message
      return await navigateTo('/login?message=auth_required');
    }

    // Si connecté (anonyme ou non) et sur page login/register, rediriger
    if (isNavigatingToLoginOrRegister && session.value) {
      return await navigateTo('/recipes/all');
    }
  },
);
