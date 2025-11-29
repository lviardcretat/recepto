import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './server/database/migrations',
  schema: './server/database/schema',
  dialect: 'sqlite',
  casing: 'snake_case',
  // DB : Uncomment it for local db
  // dbCredentials: {
  //   url: process.env.DB_FILE_NAME!,
  // },
});
