import z from 'zod';

export type SequenceCreation = z.infer<typeof sequenceCreation>;

export const sequenceCreation = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(200),
  recipeId: z.number().int().positive(),
});
