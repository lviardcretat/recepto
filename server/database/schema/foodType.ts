import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { ingredient } from './ingredient';
import { user } from './user';

export const foodType = sqliteTable('foodType', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const foodTypeRelations = relations(foodType, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [foodType.createdById],
		references: [user.id],
	}),
	ingredients: many(ingredient),
}));
