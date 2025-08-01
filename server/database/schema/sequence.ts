import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { recipe } from './recipe';
import { user } from './user';

export const sequence = sqliteTable('sequence', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  extra: text('extra'),
  recipeId: integer('recipeId')
    .notNull()
    .references(() => recipe.id, { onDelete: 'cascade' }),
  createdById: integer('createdById')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  ...timestamps,
});

export const sequenceRelations = relations(sequence, ({ one }) => ({
  createdBy: one(user, {
    fields: [sequence.createdById],
    references: [user.id],
  }),
  recipe: one(recipe, {
    fields: [sequence.recipeId],
    references: [recipe.id],
  }),
}));
