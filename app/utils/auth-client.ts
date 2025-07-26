import { adminClient, anonymousClient, usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/vue';

export const authClient = createAuthClient({
  plugins: [usernameClient(), adminClient(), anonymousClient()],
});

export type User = typeof authClient.$Infer.Session.user;
