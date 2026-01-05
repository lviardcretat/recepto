import z from 'zod';

export type RecipesCategoryCreationSchema = z.infer<typeof recipesCategoryCreationSchema>;

export const recipesCategoryCreationSchema = z.object({
  name: z.string().min(3).max(50),
  dishTypeId: z.number().int().positive(),
});
