import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../columns.helper';
import { user } from './user';
import { relations } from 'drizzle-orm';

export const account = sqliteTable('account', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('userId')
		.notNull()
		.references(() => user.id),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	accessTokenExpiresAt: integer('accessTokenExpiresAt', {
		mode: 'timestamp_ms',
	}),
	refreshTokenExpiresAt: integer('refreshTokenExpiresAt', {
		mode: 'timestamp_ms',
	}),
	scope: text('scope'),
	idToken: text('idToken'),
	password: text('password'),
	...timestamps,
});

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
