import type { UserInsert } from '~/server/utils/drizzle';

export const usersSeed: UserInsert[] = [
	{
		id: 1,
		name: 'admin',
		email: 'admin@admin.com',
		emailVerified: true,
		image: 'https://example.com/avatar/john.png',
	},
];
