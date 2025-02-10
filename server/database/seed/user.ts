import type { UserInsert } from '~/server/utils/drizzle';

export const usersSeed: UserInsert[] = [
	{
		id: 1,
		firstname: 'John',
		lastname: 'Doe',
		email: 'john@example.com',
		password: 'password123',
		avatar: 'https://example.com/avatar/john.png',
		role: 'admin',
	},
];
