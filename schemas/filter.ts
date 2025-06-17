import z from 'zod';

export type RecipesCategoriesFilter = z.infer<
	typeof recipesCategoriesFilterSchema
>;
export type FilterSelectItem = z.infer<typeof wantedList>;
export type RecipesFilter = z.infer<typeof recipesFilterSchema>;

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
