import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { user } from './user';
import { timestamps } from '../columns.helper';
import { relations } from 'drizzle-orm';

export const session = sqliteTable('session', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	...timestamps,
});

export const accountRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));
