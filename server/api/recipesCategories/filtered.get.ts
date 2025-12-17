import { getRecipesCategoriesFiltered } from '~~/server/data/recipesCategories';
import {
  recipesCategoriesFilterSchema,

} from '~/schemas/filter';
import type { RecipesCategoriesFilter } from '~/schemas/filter';
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';

export default defineEventHandler(async (event) => {
  const query: RecipesCategoriesFilter = await getValidatedQuery(
    event,
    recipesCategoriesFilterSchema.parse,
  );
  const recipesCategoriesFiltered: IRecipesCategoriesWithLessData[] = await getRecipesCategoriesFiltered(query);
  if (!recipesCategoriesFiltered) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RecipesCategoriesFiltered not found',
    });
  }
  return recipesCategoriesFiltered;
});
