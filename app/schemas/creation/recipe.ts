import z from 'zod';

export type RecipeCreation = z.infer<typeof recipeCreation>;
export type RecipeSequenceCreation = z.infer<typeof recipeSequenceCreation>;
export type RecipeIngredientsCreation = z.infer<typeof recipeIngredientsCreation>;

const recipeSequenceCreation = z
  .array(
    z.object({
      name: z.string().min(3).max(100),
      extra: z.string().min(3).max(200).optional(),
    }),
  )
  .nonempty();

const recipeIngredientsCreation = z
  .array(
    z.object({
      ingredientId: z.number().int().positive(),
      quantity: z.number().positive(),
      unitId: z.number().int().positive().optional(),
    }),
  )
  .nonempty();

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
        ingredientIds => ingredientIds.ingredientId,
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
  allergens: z.array(z.number().int().positive()).optional(),
  ustensils: z.array(z.number().int().positive()).nonempty(),
  recipesCategoryId: z.number().int().positive(),
});
