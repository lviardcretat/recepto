import { getUstensilsDashboard } from '~~/server/data/ustensils';
import type { Ustensil } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const ustensils: Partial<Ustensil>[] = await getUstensilsDashboard(+session.user.id);
    if (!ustensils) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipes not found',
      });
    }
    return ustensils;
  }
});
