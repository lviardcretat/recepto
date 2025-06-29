import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { authClient } from '~/utils/auth-client';
export default defineNuxtRouteMiddleware(
	async (
		to: RouteLocationNormalizedGeneric,
		_from: RouteLocationNormalizedGeneric,
	) => {
		const { data: session } = await authClient.useSession(useFetch);
		if (!session.value) {
			return navigateTo('/');
		}

		const isNavigatingToLoginOrRegister = to.path === '/';
		if (!isNavigatingToLoginOrRegister && !session.value) {
			return await navigateTo('/');
		}
		if (isNavigatingToLoginOrRegister && session.value) {
			return await navigateTo('/recipes/all');
		}
	},
);
