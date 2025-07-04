import z from 'zod';

export type IngredientCreation = z.infer<typeof ingredientCreationSchema>;

export const ingredientCreationSchema = z.object({
  name: z.string().min(3).max(50),
  foodTypeId: z.number().int().positive(),
  seasonalMonths: z.array(z.array(z.number().int())).optional(),
});
