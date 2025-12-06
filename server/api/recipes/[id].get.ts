import { getRecipe, getRecipeWithAllData } from '~~/server/data/recipes';
import { idSchema } from '~/schemas/businessObjects';
import type { RecipeDetail } from '~/types/recipeCard';

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, idSchema.parse);

  // Check if this is a request for editing (with full data)
  const query = getQuery(event);
  if (query.edit === 'true') {
    const { user } = await requireUserSession(event);
    const recipe = await getRecipeWithAllData(id);

    if (!recipe) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Recipe not found',
      });
    }

    if (recipe.createdById !== user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: You can only edit your own recipes',
      });
    }

    return recipe;
  }

  // Default behavior: return recipe for display
  const recipe: RecipeDetail | undefined = await getRecipe(id);
  if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipe not found',
    });
  }
  return recipe;
});
