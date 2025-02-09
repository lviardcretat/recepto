import { sql } from 'drizzle-orm';
import { integer } from 'drizzle-orm/sqlite-core';

export const timestamps = {
	createdAt: integer('createdAt', { mode: 'timestamp' })
		.notNull()
		.default(sql`(currentTimestamp)`),
	updatedAt: integer('updatedAt', { mode: 'timestamp' })
		.notNull()
		.default(sql`(currentTimestamp)`),
};
