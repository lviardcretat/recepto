import { z } from 'zod';

/**
 * Validation schema for ids
 */
export const idSchema = z.object({
	id: z
		.string()
		.transform(Number)
		.refine((n) => Number.isInteger(n) && n > 0, {
			params: {
				i18n: {
					key: 'zodErrors.iPositiveInteger',
				},
			},
		}),
});

/**
 * Validation schema for names on searchBar
 */
export const namesSearchBarSchema = z.object({
	name: z.string().trim().max(50),
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
			notWanted: z.array(z.number().int().positive()),
			wanted: z.array(z.number().int().positive()),
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
			params: {
				i18n: {
					key: 'zodErrors.iPositiveInteger',
				},
			},
		}),
});

/**
 * Validation schema for ustensil post requests
 */
export type UstensilCreationSchema = z.infer<typeof ustensilCreationSchema>;
export const ustensilCreationSchema = z.object({
	name: z.string().min(3).max(50),
});

/**
 * Validation schema for ingredient post requests
 */
export type IngredientCreation = z.infer<typeof ingredientCreationSchema>;
export const ingredientCreationSchema = z.object({
	name: z.string().min(3).max(50),
	foodTypeId: z.number().int().positive(),
	seasonalMonths: z.array(z.array(z.number().int())).optional(),
});

/**
 * Validation schema for recipesCategory post requests
 */
export type RecipesCategoryCreation = z.infer<typeof recipesCategoryCreation>;
export const recipesCategoryCreation = z.object({
	name: z.string().min(3).max(50),
	dishTypeId: z.number().int().positive(),
});

/**
 * Validation schema for recipe post requests
 */

export type RecipeSequenceCreation = z.infer<typeof recipeSequenceCreation>;
const recipeSequenceCreation = z
	.array(
		z.object({
			title: z.string().min(3).max(100),
			description: z.string().min(3).max(200),
		}),
	)
	.nonempty();
export type RecipeIngredientsCreation = z.infer<
	typeof recipeIngredientsCreation
>;
const recipeIngredientsCreation = z
	.array(
		z.object({
			ingredientId: z.number().int().positive(),
			quantity: z.number().positive(),
			unitId: z.number().int().positive(),
		}),
	)
	.nonempty();
export type RecipeCreation = z.infer<typeof recipeCreation>;
export const recipeCreation = z.object({
	name: z.string().min(3).max(50),
	description: z.string().min(3).max(1000),
	tips: z.string().min(3).max(200).optional(),
	peopleNumber: z.number().int().positive(),
	preparationTime: z.number().nonnegative(),
	cookingTime: z.number().nonnegative(),
	restTime: z.number().nonnegative(),
	seasonId: z.number().int().positive(),
	sequences: recipeSequenceCreation,
	ingredients: recipeIngredientsCreation.refine(
		(val) => {
			const ingredientsIds = val.map(
				(ingredientIds) => ingredientIds.ingredientId,
			);
			const uniqueValues = new Set(ingredientsIds);
			return uniqueValues.size === ingredientsIds.length;
		},
		{
			params: {
				i18n: {
					key: 'zodErrors.duplicateIngredients',
				},
			},
		},
	),
	allergens: z.array(z.number().int().positive()),
	ustensils: z.array(z.number().int().positive()).nonempty(),
	recipesCategoryId: z.number().int().positive(),
});

/**
 * Validation schema for sequence post requests
 */
export type SequenceCreation = z.infer<typeof sequenceCreation>;
export const sequenceCreation = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(3).max(200),
	recipeId: z.number().int().positive(),
});
