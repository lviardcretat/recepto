import { deleteRecipesCategory, getRecipesCategory } from '~~/server/data/recipesCategories';
import { idSchema } from '~/schemas/businessObjects';
import type { RecipesCategory } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);

  // Check if category exists and belongs to user
  const existingCategory: RecipesCategory | undefined = await getRecipesCategory(id);
  if (!existingCategory) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipes category not found',
    });
  }

  if (existingCategory.createdById !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: You can only delete your own categories',
    });
  }

  // Check if category has any recipes
  const categoryRecipes = await db
    .select()
    .from(schema.recipe)
    .where(eq(schema.recipe.recipesCategoryId, id))
    .limit(1)
    .get();

  if (categoryRecipes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot delete category: It contains recipes',
    });
  }

  await deleteRecipesCategory(id);

  return { success: true };
});
