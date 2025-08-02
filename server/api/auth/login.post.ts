import { loginSchema } from '~/schemas/auth/login';
import { findUserByUsername } from '~~/server/data/user';

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, loginSchema.parse);

  const user = await findUserByUsername(username);

  if (!user || !user.password) {
    return {
      success: false,
      error: 'auth.login.errors.default',
    };
  }

  const isValidPassword = await verifyPassword(user.password, password);

  if (!isValidPassword) {
    return {
      success: false,
      error: 'auth.login.errors.default',
    };
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      username: user.username,
      isAnonymous: user.isAnonymous,
    },
  });

  return { success: true };
});
