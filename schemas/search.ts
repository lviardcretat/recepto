import z from 'zod';

export const namesSearchBarSchema = z.object({
	name: z.string().trim().max(50),
});
