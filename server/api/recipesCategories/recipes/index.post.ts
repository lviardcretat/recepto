import { recipeCreation } from '~/global/validationSchemas';
import { postRecipeIngredient } from '~/server/data/recipeIngredients';
import { postRecipe } from '~/server/data/recipes';
import { postSequence } from '~/server/data/sequences';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, recipeCreation.parse);
	const recipe = await postRecipe(
		body.name,
		body.description,
		body.tips,
		body.peopleNumber,
		body.preparationTime,
		body.cookingTime,
		body.restTime,
		body.seasonId,
		body.recipesCategoryId,
		body.allergens,
		body.ustensils,
		1,
	);
	for (const sequence of body.sequences) {
		await postSequence(sequence.title, sequence.description, recipe.id, 1);
	}
	for (const ingredient of body.ingredients) {
		await postRecipeIngredient(
			ingredient.ingredientId,
			ingredient.quantity,
			ingredient.unitId,
			recipe.id,
		);
	}
	return recipe;
});
