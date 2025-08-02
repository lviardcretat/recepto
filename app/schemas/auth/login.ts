import z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Trop court !'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginSchema = z.output<typeof loginSchema>;
