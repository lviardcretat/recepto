import type { UserInsert } from '~~/server/utils/drizzleUtils';

export const usersSeed: UserInsert[] = [
	{
		id: 999,
		username: 'admin',
		displayUsername: 'admin',
		email: 'test@test.com',
		emailVerified: true,
		name: 'Admin admin',
		image: 'https://example.com/avatar/john.png',
	},
];
