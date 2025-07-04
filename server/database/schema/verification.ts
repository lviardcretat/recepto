import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamps } from '../columns.helper';

export const verification = sqliteTable('verification', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  ...timestamps,
});
