import type { H3Event } from 'h3';
import { betterAuth } from 'better-auth';
import { admin, username } from 'better-auth/plugins';
import { D1Dialect } from '@atinux/kysely-d1';

function createAuth() {
	return betterAuth({
		database: {
			dialect: new D1Dialect({
				database: hubDatabase(),
			}),
			type: 'sqlite',
		},
		emailAndPassword: {
			enabled: true,
		},
		plugins: [username(), admin()],
		trustedOrigins: ['https://recepto.net'],
		advanced: {
			database: {
				generateId: false,
			},
		},
	});
}

let _auth: ReturnType<typeof createAuth>;

export function serverAuth() {
	if (!_auth) {
		_auth = createAuth();
	}

	return _auth;
}

/**
 *  Get the user from the event or throw an error if the user is not authenticated.
 */
export function getUserOrThrow(event: H3Event) {
	if (!event.context.auth.isAuthenticated) {
		throw createError({
			status: 401,
			message: 'Unauthorized',
		});
	}

	return event.context.auth.user;
}

/**
 * Just checks whether the user is authenticated or not.
 * Throws 401 error if the user is not authenticated.
 */
export function requireAuth(event: H3Event): void {
	if (!event.context.auth.isAuthenticated) {
		throw createError({
			status: 401,
			message: 'Unauthorized',
		});
	}
}
