import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../columns.helper';
import { user } from './user';
import { relations } from 'drizzle-orm';

export const account = sqliteTable('account', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	accessTokenExpiresAt: integer('access_token_expires_at', {
		mode: 'timestamp_ms',
	}),
	refreshTokenExpiresAt: integer('refresh_token_expires_at', {
		mode: 'timestamp_ms',
	}),
	scope: text('scope'),
	idToken: text('id_token'),
	password: text('password'),
	...timestamps,
});

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));
