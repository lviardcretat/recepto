import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { dishType } from './dishType';
import { recipe } from './recipe';
import { user } from './user';
import { mealTypeToRecipeCategory } from './mealTypeToRecipeCategory';

export const recipesCategory = sqliteTable('recipesCategory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  dishTypeId: integer('dishTypeId')
    .notNull()
    .references(() => dishType.id, { onDelete: 'cascade' }),
  createdById: integer('createdById')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  selectMenuType: text('selectMenuType'),
  ...timestamps,
});

export const recipesCategoriesRelations = relations(
  recipesCategory,
  ({ one, many }) => ({
    dishType: one(dishType, {
      fields: [recipesCategory.dishTypeId],
      references: [dishType.id],
    }),
    createdBy: one(user, {
      fields: [recipesCategory.createdById],
      references: [user.id],
    }),
    mealTypeToRecipeCategories: many(mealTypeToRecipeCategory),
    recipes: many(recipe),
  }),
);
