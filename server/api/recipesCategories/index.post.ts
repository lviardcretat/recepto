import { recipesCategoryCreation } from '~/schemas/creation/recipesCategory';
import { postRecipesCategory } from '~~/server/data/recipesCategories';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const body = await readValidatedBody(event, recipesCategoryCreation.parse);
    await postRecipesCategory(body.name, body.dishTypeId, +session.user.id);
  }
});
