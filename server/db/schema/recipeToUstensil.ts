import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { recipe } from './recipe';
import { ustensil } from './ustensil';

export const recipeToUstensil = sqliteTable(
  'recipeToUstensil',
  {
    recipeId: integer('recipeId')
      .notNull()
      .references(() => recipe.id, { onDelete: 'cascade' }),
    ustensilId: integer('ustensilId')
      .notNull()
      .references(() => ustensil.id, { onDelete: 'cascade' }),
  },
  t => [primaryKey({ columns: [t.recipeId, t.ustensilId] })],
);

export const recipeToUstensilRelations = relations(
  recipeToUstensil,
  ({ one }) => ({
    recipe: one(recipe, {
      fields: [recipeToUstensil.recipeId],
      references: [recipe.id],
    }),
    ustensil: one(ustensil, {
      fields: [recipeToUstensil.ustensilId],
      references: [ustensil.id],
    }),
  }),
);
