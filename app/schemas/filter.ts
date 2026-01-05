import z from 'zod';

export type RecipesCategoriesFilterSchema = z.infer<typeof recipesCategoriesFilterSchema>;
export type FilterSelectItemSchema = z.infer<typeof wantedList>;
export type RecipesFilterSchema = z.infer<typeof recipesFilterSchema>;

const wantedList = z
  .string()
  .transform(str => JSON.parse(str))
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
  seasonalRecipes: z.enum(['true', 'false']).transform(str => str === 'true'),
  allergens: z.union([z.string().default('[]'), z.array(z.string()).default([])])
    .transform((str: string | string[]) => {
      if (Array.isArray(str)) {
        return str.map(Number);
      }
      const truc: string[] | number = JSON.parse(str.replace(/'/g, '"'));
      if (Array.isArray(truc)) {
        return truc.map(Number);
      }
      return [truc];
    }).pipe(z.array(z.number().int().positive())),
});

export const recipesFilterSchema = z.object({
  ingredients: wantedList,
  ustensils: wantedList,
  seasonalRecipes: z.enum(['true', 'false']).transform(str => str === 'true'),
  allergens: z.array(z.number().int().positive()).default([]),
  recipeCategoryId: z
    .string()
    .transform(Number)
    .refine(n => Number.isInteger(n) && n > 0, {
      params: {
        i18n: {
          key: 'zodErrors.iPositiveInteger',
        },
      },
    }),
});
