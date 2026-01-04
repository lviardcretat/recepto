import type { RouteLocationNormalizedGeneric } from 'vue-router';

export default defineNuxtRouteMiddleware(
  async (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedGeneric,
  ) => {
    const { loggedIn, user, fetch } = useUserSession();
    const isNavigatingToLoginOrRegister = to.path === '/' || to.path === '/login';

    // Rafraîchir la session si nécessaire
    if (!user.value) {
      await fetch();
    }

    // Éviter les redirections en boucle (seulement si la session est valide)
    if (from.path === to.path && loggedIn.value) {
      return;
    }

    if (!isNavigatingToLoginOrRegister && !loggedIn.value) {
      return navigateTo('/login');
    }

    if (isNavigatingToLoginOrRegister && loggedIn.value) {
      return navigateTo('/recipes/all');
    }
  },
);
