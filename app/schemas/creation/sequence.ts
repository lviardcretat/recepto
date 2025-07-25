import z from 'zod';

export type SequenceCreation = z.infer<typeof sequenceCreation>;

export const sequenceCreation = z.object({
  name: z.string().min(3).max(100),
  extra: z.string().min(3).max(200).optional(),
  recipeId: z.number().int().positive(),
});
