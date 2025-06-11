import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { timestamps } from '../columns.helper';
import { allergen } from './allergen';
import { dishType } from './dishType';
import { foodType } from './foodType';
import { ingredient } from './ingredient';
import { mealType } from './mealType';
import { recipe } from './recipe';
import { recipesCategory } from './recipesCategory';
import { season } from './season';
import { sequence } from './sequence';
import { unit } from './unit';
import { ustensil } from './ustensil';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' })
		.default(false)
		.notNull(),
	image: text('image'),
	name: text('name').notNull(),
	firstname: text('firstname').notNull(),
	lastname: text('lastname').notNull(),
	role: text('role').notNull(),
	avatar: text('avatar').notNull(),
	...timestamps,
});

export const userRelations = relations(user, ({ many }) => ({
	recipes: many(recipe),
	seasons: many(season),
	sequences: many(sequence),
	ustensils: many(ustensil),
	ingredients: many(ingredient),
	foodTypes: many(foodType),
	allergens: many(allergen),
	units: many(unit),
	recipesCategories: many(recipesCategory),
	mealTypes: many(mealType),
	dishTypes: many(dishType),
}));
