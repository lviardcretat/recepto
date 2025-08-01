import { getRecipe } from '~~/server/data/recipes';
import { idSchema } from '~/schemas/businessObjects';
import type { RecipeDetail } from '~/types/recipeCard';

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const recipe: RecipeDetail | undefined = await getRecipe(id);
  if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipe not found',
    });
  }
  return recipe;
});
