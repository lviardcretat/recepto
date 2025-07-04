import z from 'zod';

export type RecipesCategoryCreation = z.infer<typeof recipesCategoryCreation>;

export const recipesCategoryCreation = z.object({
  name: z.string().min(3).max(50),
  dishTypeId: z.number().int().positive(),
});
