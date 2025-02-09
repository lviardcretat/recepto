import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipesCategory } from './recipesCategory';
import { user } from './user';

export const mealType = sqliteTable('mealType', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const mealTypeRelations = relations(mealType, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [mealType.createdById],
		references: [user.id],
	}),
	recipesCategories: many(recipesCategory),
}));
