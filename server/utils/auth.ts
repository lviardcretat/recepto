import { betterAuth } from 'better-auth';
import { admin, anonymous, username } from 'better-auth/plugins';
import { D1Dialect } from '@atinux/kysely-d1';

function createAuth() {
  return betterAuth({
    database: {
      dialect: new D1Dialect({
        database: hubDatabase(),
      }),
      type: 'sqlite',
    },
    secondaryStorage: {
      get: key => hubKV().getItemRaw(`_auth:${key}`),
      set: (key, value, ttl) => {
        return hubKV().set(`_auth:${key}`, value, { ttl });
      },
      delete: key => hubKV().del(`_auth:${key}`),
    },
    emailAndPassword: {
      enabled: true,
    },
    plugins: [username(), admin(), anonymous()],
    trustedOrigins: ['https://recepto.net'],
    advanced: {
      database: {
        generateId: false,
      },
    },
  });
}

let _auth: ReturnType<typeof createAuth>;

export function serverAuth() {
  if (!_auth) {
    _auth = createAuth();
  }

  return _auth;
}
