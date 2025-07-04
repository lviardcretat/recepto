import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { foodType } from './foodType';
import { recipeIngredient } from './recipeIngredient';
import { user } from './user';

export const ingredient = sqliteTable('ingredient', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  foodTypeId: integer('foodTypeId')
    .notNull()
    .references(() => foodType.id, { onDelete: 'cascade' }),
  seasonalMonths: text('seasonalMonths', { mode: 'json' }).notNull(),
  createdById: integer('createdById')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  ...timestamps,
});

export const ingredientRelations = relations(ingredient, ({ one, many }) => ({
  foodType: one(foodType, {
    fields: [ingredient.foodTypeId],
    references: [foodType.id],
  }),
  createdBy: one(user, {
    fields: [ingredient.createdById],
    references: [user.id],
  }),
  recipes: many(recipeIngredient),
}));
