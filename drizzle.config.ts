import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './server/database/migrations',
	schema: './server/database/schema',
	dialect: 'sqlite',
	casing: 'snake_case',
	/* Uncomment it for local bdd
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		url: process.env.DB_FILE_NAME!,
	},*/
});
