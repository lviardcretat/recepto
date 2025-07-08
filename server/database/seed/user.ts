import type { UserInsert } from '~~/server/utils/drizzleUtils';

export const usersSeed: UserInsert[] = [
  {
    id: 1,
    username: 'admin',
    displayUsername: 'admin',
    email: 'admin@admin.com',
    emailVerified: true,
    name: 'Admin admin',
    image: 'image',
  },
];
