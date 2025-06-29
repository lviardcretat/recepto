import type { AllergenToRecipeInsert } from '~/server/utils/drizzleUtils';

export const allergenToRecipesSeed: AllergenToRecipeInsert[] = [
	{
		recipeId: 1,
		allergenId: 1,
	},
	{
		recipeId: 1,
		allergenId: 3,
	},
	{
		recipeId: 2,
		allergenId: 1,
	},
	{
		recipeId: 3,
		allergenId: 1,
	},
	{
		recipeId: 4,
		allergenId: 1,
	},
];
