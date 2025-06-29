import z from 'zod';

export type UstensilCreationSchema = z.infer<typeof ustensilCreationSchema>;

export const ustensilCreationSchema = z.object({
	name: z.string().min(3).max(50),
});
