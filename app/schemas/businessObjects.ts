import z from 'zod';

export const idSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .refine(n => Number.isInteger(n) && n > 0, {
      params: {
        i18n: {
          key: 'zodErrors.iPositiveInteger',
        },
      },
    }),
});
