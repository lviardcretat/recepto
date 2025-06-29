import type { RecipeToUstensilInsert } from '~~/server/utils/drizzleUtils';

export const recipeToUstensilsSeed: RecipeToUstensilInsert[] = [
	{
		recipeId: 1,
		ustensilId: 1,
	},
	{
		recipeId: 1,
		ustensilId: 3,
	},
	{
		recipeId: 2,
		ustensilId: 1,
	},
	{
		recipeId: 2,
		ustensilId: 3,
	},
	{
		recipeId: 3,
		ustensilId: 6,
	},
	{
		recipeId: 4,
		ustensilId: 6,
	},
	{
		recipeId: 5,
		ustensilId: 8,
	},
];
