import type { UserInsert } from '~~/server/utils/drizzleUtils';

export const usersSeed: UserInsert[] = [
  {
    id: 1,
    username: 'admin',
  },
];
