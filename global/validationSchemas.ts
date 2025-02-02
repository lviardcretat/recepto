import { z } from 'zod';

/**
 * Validation schema for ids
 */
export const idSchema = z.object({
	id: z
		.string()
		.transform(Number)
		.refine((n) => Number.isInteger(n) && n > 0, {
			message: "L'id doit être un entier positif.",
		}),
});

/**
 * Validation schema for names on searchBar
 */
export const namesSearchBarSchema = z.object({
	name: z.string().trim().max(40, {
		message: 'Le texte de recherche est trop long (max 100 caractères).',
	}),
});

/**
 * Validation schema for recipesCategories filtering
 */
export type RecipesCategoriesFilter = z.infer<
	typeof recipesCategoriesFilterSchema
>;
export type FilterSelectItem = z.infer<typeof wantedList>;
const wantedList = z
	.string()
	.transform((str) => JSON.parse(str))
	.pipe(
		z.object({
			wanted: z.array(z.number().int().positive()),
			notWanted: z.array(z.number().int().positive()),
		}),
	);
export const recipesCategoriesFilterSchema = z.object({
	ingredients: wantedList,
	ustensils: wantedList,
	mealTypes: wantedList.optional(),
	dishTypes: wantedList.optional(),
	seasonalRecipes: z.enum(['true', 'false']).transform((str) => str === 'true'),
	allergens: z.array(z.number().int().positive()).default([]),
});

/**
 * Validation schema for recipes filtering
 */
export type RecipesFilter = z.infer<typeof recipesFilterSchema>;
export const recipesFilterSchema = z.object({
	ingredients: wantedList,
	ustensils: wantedList,
	seasonalRecipes: z.enum(['true', 'false']).transform((str) => str === 'true'),
	allergens: z.array(z.number().int().positive()).default([]),
	recipeCategoryId: z
		.string()
		.transform(Number)
		.refine((n) => Number.isInteger(n) && n > 0, {
			message: "L'id doit être un entier positif.",
		}),
});
