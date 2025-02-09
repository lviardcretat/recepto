import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipeIngredient } from './recipeIngredient';
import { user } from './user';

export const unit = sqliteTable('unit', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	shortForm: text('shortForm').notNull(),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const unitRelations = relations(unit, ({ one, many }) => ({
	createdBy: one(user, {
		fields: [unit.createdById],
		references: [user.id],
	}),
	recipeIngredients: many(recipeIngredient),
}));
