import type { User } from '../utils/drizzleUtils';

/**
 * Finds a user by their username.
 * @param username - The username to search for
 * @returns The user if found, undefined otherwise
 */
export async function findUserByUsername(username: string): Promise<User | undefined> {
  const user = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.username, username))
    .get();
  return user;
}

/**
 * Creates a new user with a hashed password.
 * @param username - The username for the new user
 * @param password - The plain text password to hash and store
 * @returns The newly created user
 */
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
