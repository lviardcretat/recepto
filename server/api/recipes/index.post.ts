import { recipeCreationSchema } from '~/schemas/creation/recipe';
import { postRecipeIngredient } from '~~/server/data/recipeIngredients';
import { postRecipe } from '~~/server/data/recipes';
import { postSequence } from '~~/server/data/sequences';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session && !session.user.isAnonymous) {
    const body = await readValidatedBody(event, recipeCreationSchema.parse);
    const recipeId: number = await postRecipe(
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
      +session.user.id,
    );
    for (const sequence of body.sequences) {
      await postSequence(sequence.name, sequence.extra, recipeId, +session.user.id);
    }
    for (const ingredient of body.ingredients) {
      await postRecipeIngredient(
        ingredient.ingredientId,
        ingredient.quantity,
        recipeId,
        ingredient.unitId,
      );
    }
  }
});
