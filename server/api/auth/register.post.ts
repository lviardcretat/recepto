import { registerSchema } from '~/schemas/auth/register';
import { findUserByUsername, createUser } from '~~/server/data/user';

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, registerSchema.parse);

  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    return {
      success: false,
      error: 'auth.register.errors.usernameAlreadyExist',
    };
  }

  const newUser = await createUser(username, password);

  if (!newUser) {
    return {
      success: false,
      error: 'auth.register.errors.unknown',
    };
  }

  await setUserSession(event, {
    user: {
      id: newUser.id,
      username: newUser.username,
      isAnonymous: newUser.isAnonymous,
    },
  });

  return { success: true };
});
