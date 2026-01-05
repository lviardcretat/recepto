import { getRecipesFiltered } from '~~/server/data/recipes';
import { recipesFilterSchema } from '~/schemas/filter';
import type { RecipesFilterSchema } from '~/schemas/filter';
import type { IRecipeWithLessData } from '~/types/recipe/detail';

export default defineEventHandler(async (event) => {
  const query: RecipesFilterSchema = await getValidatedQuery(
    event,
    recipesFilterSchema.parse,
  );
  const recipesFiltered: IRecipeWithLessData[] = await getRecipesFiltered(query);
  if (!recipesFiltered) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RecipesFiltered not found',
    });
  }
  return recipesFiltered;
});
