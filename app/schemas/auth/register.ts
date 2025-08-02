import z from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Trop court !'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

export type RegisterSchema = z.output<typeof registerSchema>;
