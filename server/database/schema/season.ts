import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipe } from './recipe';
import { user } from './user';

export const season = sqliteTable('season', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	start: integer('start').notNull(),
	end: integer('end').notNull(),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const seasonRelations = relations(season, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [season.createdById],
		references: [user.id],
	}),
	recipes: many(recipe),
}));
