import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { user } from './user';
import { timestamps } from '../columns.helper';
import { relations } from 'drizzle-orm';

export const session = sqliteTable('session', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	token: text('token').notNull().unique(),
	expiresAt: integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	impersonatedBy: text('impersonatedBy'),
	...timestamps,
});

export const accountRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));
