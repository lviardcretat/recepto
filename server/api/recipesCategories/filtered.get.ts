import { getRecipesCategoriesFiltered } from '~~/server/data/recipesCategories';
import {
  recipesCategoriesFilterSchema,

} from '~/schemas/filter';
import type { RecipesCategoriesFilter } from '~/schemas/filter';
import type { RecipesCategoriesWithLessData } from '~/types/filter';

export default defineEventHandler(async (event) => {
  const query: RecipesCategoriesFilter = await getValidatedQuery(
    event,
    recipesCategoriesFilterSchema.parse,
  );
  const recipesCategoriesFiltered: RecipesCategoriesWithLessData[] = await getRecipesCategoriesFiltered(query);
  if (!recipesCategoriesFiltered) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RecipesCategoriesFiltered not found',
    });
  }
  return recipesCategoriesFiltered;
});
