import { anonymousClient, usernameClient, adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/vue';

export const authClient = createAuthClient({
  plugins: [adminClient(), usernameClient(), anonymousClient()],
});

export type User = typeof authClient.$Infer.Session.user;
