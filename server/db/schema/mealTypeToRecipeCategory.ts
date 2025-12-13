import { sqliteTable, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { mealType } from './mealType';
import { recipesCategory } from './recipesCategory';

export const mealTypeToRecipeCategory = sqliteTable(
  'mealTypeToRecipeCategory',
  {
    mealTypeId: integer('mealTypeId')
      .notNull()
      .references(() => mealType.id, { onDelete: 'cascade' }),
    recipeCategoryId: integer('recipeCategoryId')
      .notNull()
      .references(() => recipesCategory.id, { onDelete: 'cascade' }),
  },
  t => [primaryKey({ columns: [t.mealTypeId, t.recipeCategoryId] })],
);

export const mealTypeToRecipeCategoryRelations = relations(
  mealTypeToRecipeCategory,
  ({ one }) => ({
    mealTypes: one(mealType, {
      fields: [mealTypeToRecipeCategory.mealTypeId],
      references: [mealType.id],
    }),
    recipesCategories: one(recipesCategory, {
      fields: [mealTypeToRecipeCategory.recipeCategoryId],
      references: [recipesCategory.id],
    }),
  }),
);
