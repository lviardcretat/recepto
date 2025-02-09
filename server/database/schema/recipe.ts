import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { allergen } from './allergen';
import { recipeIngredient } from './recipeIngredient';
import { recipesCategory } from './recipesCategory';
import { season } from './season';
import { sequence } from './sequence';
import { user } from './user';
import { ustensil } from './ustensil';

export const recipe = sqliteTable('recipe', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	peopleNumber: integer('peopleNumber').notNull(),
	cookingTime: real('cookingTime'),
	preparationTime: real('preparationTime'),
	restTime: real('restTime'),
	description: text('description'),
	tips: text('tips'),
	seasonId: integer('seasonId')
		.notNull()
		.references(() => season.id, { onDelete: 'cascade' }),
	recipesCategoryId: integer('recipesCategoryId')
		.notNull()
		.references(() => recipesCategory.id, { onDelete: 'cascade' }),

	createdById: integer('createdById')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	...timestamps,
});

export const recipeRelations = relations(recipe, ({ one, many }) => ({
	season: one(season, {
		fields: [recipe.seasonId],
		references: [season.id],
	}),
	recipesCategory: one(recipesCategory, {
		fields: [recipe.recipesCategoryId],
		references: [recipesCategory.id],
	}),
	createdBy: one(user, {
		fields: [recipe.createdById],
		references: [user.id],
	}),
	ustensils: many(ustensil),
	sequences: many(sequence),
	allergens: many(allergen),
	ingredients: many(recipeIngredient),
}));
