import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipesCategory } from './recipesCategory';
import { user } from './user';

export const dishType = sqliteTable('dishType', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const dishTypeRelations = relations(dishType, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [dishType.createdById],
		references: [user.id],
	}),
	recipesCategories: many(recipesCategory),
}));
