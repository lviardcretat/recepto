import { updateRecipesCategory, getRecipesCategory } from '~~/server/data/recipesCategories';
import { idSchema } from '~/schemas/businessObjects';
import { recipesCategoryCreationSchema } from '~/schemas/creation/recipesCategory';
import type { RecipesCategory } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const body = await readValidatedBody(event, recipesCategoryCreationSchema.parse);

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
      statusMessage: 'Forbidden: You can only edit your own categories',
    });
  }

  const updatedCategory = await updateRecipesCategory(id, {
    ...body,
    updatedAt: new Date().toISOString(),
  });

  return updatedCategory;
});
