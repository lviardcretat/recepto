import { recipesCategoryCreationSchema } from '~/schemas/creation/recipesCategory';
import { postRecipesCategory } from '~~/server/data/recipesCategories';
import type { RecipesCategory } from '~~/server/utils/drizzleUtils';
import { FirstLetterUppercase } from '~~/server/utils/stringUtils';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session && !session.user.isAnonymous) {
    const body = await readValidatedBody(event, recipesCategoryCreationSchema.parse);
    const recipeCategoryCreated: RecipesCategory = await postRecipesCategory(FirstLetterUppercase(body.name), body.dishTypeId, +session.user.id);
    return recipeCategoryCreated;
  }
});
