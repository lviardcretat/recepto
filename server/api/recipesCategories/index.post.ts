import { recipesCategoryCreation } from '~/schemas/creation/recipesCategory';
import { postRecipesCategory } from '~~/server/data/recipesCategories';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, recipesCategoryCreation.parse);
	const ustensil = await postRecipesCategory(body.name, body.dishTypeId, 1);
	return ustensil;
});
