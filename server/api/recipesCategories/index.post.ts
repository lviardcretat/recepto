import { recipesCategoryCreation } from '~/schemas/creation/recipesCategory';
import { postRecipesCategory } from '~~/server/data/recipesCategories';
import type { RecipesCategory } from '~~/server/utils/drizzleUtils';
import { FirstLetterUppercase } from '~~/server/utils/stringUtils';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session) {
    const body = await readValidatedBody(event, recipesCategoryCreation.parse);
    const recipeCategoryCreated: RecipesCategory = await postRecipesCategory(FirstLetterUppercase(body.name), body.dishTypeId, +session.user.id);
    return recipeCategoryCreated;
  }
});
