import type { Recipe, RecipesCategory } from '~/server/utils/drizzleUtils';

/**
 * @description Recipes searched type return
 * @type RecipeDetail
 */
export type RecipeSearched = {
	id: number;
	name: string;
	recipes: { id: number; name: string }[];
};
