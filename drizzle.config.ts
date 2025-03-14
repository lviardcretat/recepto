import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './server/database/migrations',
	schema: './server/database/schema',
	dialect: 'sqlite',
	casing: 'snake_case',
});
