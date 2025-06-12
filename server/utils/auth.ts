import type { H3Event } from 'h3';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { user } from '../database/schema/user';
import { account } from '../database/schema/account';
import { session } from '../database/schema/session';
import { verification } from '../database/schema/verification';
import { admin, username } from 'better-auth/plugins';

function createAuth() {
	return betterAuth({
		database: drizzleAdapter(useDrizzle(), {
			provider: 'sqlite',
			schema: {
				user,
				session,
				account,
				verification,
			},
		}),
		emailAndPassword: {
			enabled: true,
		},
		plugins: [username(), admin()],
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

export type SessionUser = typeof _auth.$Infer.Session.user;
