import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { ingredient } from './ingredient';
import { recipe } from './recipe';
import { unit } from './unit';

export const recipeIngredient = sqliteTable('recipeIngredient', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ingredientId: integer('ingredientId')
    .notNull()
    .references(() => ingredient.id, { onDelete: 'cascade' }),
  recipeId: integer('recipeId')
    .notNull()
    .references(() => recipe.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
  unitId: integer('unitId')
    .notNull()
    .references(() => unit.id, { onDelete: 'cascade' }),
});

export const recipeIngredientsRelations = relations(
  recipeIngredient,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [recipeIngredient.ingredientId],
      references: [ingredient.id],
    }),
    recipe: one(recipe, {
      fields: [recipeIngredient.recipeId],
      references: [recipe.id],
    }),
    unit: one(unit, {
      fields: [recipeIngredient.unitId],
      references: [unit.id],
    }),
  }),
);
