import z from 'zod';

export type SequenceCreationSchema = z.infer<typeof sequenceCreationSchema>;

export const sequenceCreationSchema = z.object({
  name: z.string().min(3).max(100),
  extra: z.string().min(3).max(200).optional(),
  recipeId: z.number().int().positive(),
});
