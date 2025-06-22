import { authClient } from '~/lib/auth-client';

export default async function defineNuxtRouteMiddleware(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	to: any,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	_from: any,
) {
	const { data: loggedIn } = await authClient.useSession(useFetch);
	const isNavigatingToLoginOrRegister = to.path === '/';
	if (!isNavigatingToLoginOrRegister && !loggedIn.value) {
		return await navigateTo('/');
	}
	if (isNavigatingToLoginOrRegister && loggedIn.value) {
		return await navigateTo('/recipes/all');
	}
}
