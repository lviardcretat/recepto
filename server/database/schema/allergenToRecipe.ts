import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { allergen } from './allergen';
import { recipe } from './recipe';

export const allergenToRecipe = sqliteTable(
  'allergenToRecipe',
  {
    allergenId: integer('allergenId')
      .notNull()
      .references(() => allergen.id, { onDelete: 'cascade' }),
    recipeId: integer('recipeId')
      .notNull()
      .references(() => recipe.id, { onDelete: 'cascade' }),
  },
  t => [primaryKey({ columns: [t.allergenId, t.recipeId] })],
);

export const allergenToRecipeRelations = relations(
  allergenToRecipe,
  ({ one }) => ({
    allergen: one(allergen, {
      fields: [allergenToRecipe.allergenId],
      references: [allergen.id],
    }),
    recipe: one(recipe, {
      fields: [allergenToRecipe.recipeId],
      references: [recipe.id],
    }),
  }),
);
