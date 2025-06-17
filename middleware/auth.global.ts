import { authClient } from '~/lib/auth-client';

export default defineNuxtRouteMiddleware(async (to, _from) => {
	const { data: loggedIn } = await authClient.useSession(useFetch);
	const isNavigatingToLoginOrRegister = to.path === '/';
	if (!isNavigatingToLoginOrRegister && !loggedIn.value) {
		return navigateTo('/');
	}
	if (isNavigatingToLoginOrRegister && loggedIn.value) {
		return navigateTo('/search');
	}
});
