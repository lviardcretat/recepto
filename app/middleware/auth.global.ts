import type { RouteLocationNormalizedGeneric } from 'vue-router';

export default defineNuxtRouteMiddleware(
  async (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedGeneric,
  ) => {
    if (from.path === to.path) {
      return;
    };

    const { loggedIn, user, fetch } = useUserSession();
    const isNavigatingToLoginOrRegister = to.path === '/' || to.path === '/login';

    // Rafraîchir la session si nécessaire
    if (!user.value) {
      await fetch();
    }

    if (!isNavigatingToLoginOrRegister && !loggedIn.value) {
      return navigateTo('/login');
    }

    if (isNavigatingToLoginOrRegister && loggedIn.value) {
      return navigateTo('/recipes/all');
    }
  },
);
