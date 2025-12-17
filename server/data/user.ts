import type { User } from '../utils/drizzleUtils';

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const user = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.username, username))
    .get();
  return user;
}

export async function createUser(username: string, password: string): Promise<User | undefined> {
  const hashedPassword = await hashPassword(password);
  const userInsert: UserInsert = {
    username: username,
    password: hashedPassword,
    isAnonymous: false,
  };
  const userCreated: User = await db
    .insert(schema.user)
    .values(userInsert)
    .returning()
    .get();
  return userCreated;
}
