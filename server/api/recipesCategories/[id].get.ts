import {
  getRecipesCategory,
} from '~~/server/data/recipesCategories';
import { idSchema } from '~/schemas/businessObjects';

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const recipesCategory: RecipesCategory | undefined = await getRecipesCategory(id);
  if (!recipesCategory) {
    throw createError({
      statusCode: 404,
      statusMessage: 'RecipesCategory not found',
    });
  }
  return recipesCategory;
});
