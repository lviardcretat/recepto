import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipe } from './recipe';
import { user } from './user';

export const allergen = sqliteTable('allergen', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	icon: text('icon'),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const allergenRelations = relations(allergen, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [allergen.createdById],
		references: [user.id],
	}),
	recipes: many(recipe),
}));
