import { sql } from 'drizzle-orm';
import { text } from 'drizzle-orm/sqlite-core';

export const timestamps = {
	createdAt: text('createdAt').notNull().default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: text('updatedAt').notNull().default(sql`(CURRENT_TIMESTAMP)`),
};
