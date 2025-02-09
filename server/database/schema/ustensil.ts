import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipe } from './recipe';
import { user } from './user';

export const ustensil = sqliteTable('ustensil', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const ustensilRelations = relations(ustensil, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [ustensil.createdById],
		references: [user.id],
	}),
	recipes: many(recipe),
}));
