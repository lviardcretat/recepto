import { updateRecipe, getRecipeBasic } from '~~/server/data/recipes';
import { idSchema } from '~/schemas/businessObjects';
import { recipeCreationSchema } from '~/schemas/creation/recipe';
import type { Recipe, RecipeIngredient, Sequence, AllergenToRecipe, RecipeToUstensil } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const body = await readValidatedBody(event, recipeCreationSchema.parse);

  // Check if recipe exists and belongs to user
  const existingRecipe: Recipe | undefined = await getRecipeBasic(id);
  if (!existingRecipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Recipe not found',
    });
  }

  if (existingRecipe.createdById !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: You can only edit your own recipes',
    });
  }

  // Extract recipe data from the body
  const {
    ingredients,
    sequences,
    allergens,
    ustensils,
    ...recipeData
  } = body;

  // Update the recipe basic data
  const updatedRecipe = await updateRecipe(id, {
    ...recipeData,
    updatedAt: new Date().toISOString(),
  });

  // Update ingredients - delete existing and insert new ones
  await db
    .delete(schema.recipeIngredient)
    .where(eq(schema.recipeIngredient.recipeId, id));

  for (const ingredient of ingredients) {
    const recipeIngredient: RecipeIngredient = {
      recipeId: id,
      ingredientId: ingredient.ingredientId,
      quantity: ingredient.quantity,
      unitId: ingredient.unitId,
    };
    await db
      .insert(schema.recipeIngredient)
      .values(recipeIngredient);
  }

  // Update sequences - delete existing and insert new ones
  await db
    .delete(schema.sequence)
    .where(eq(schema.sequence.recipeId, id));

  for (const sequence of sequences) {
    const recipeSequence: Sequence = {
      recipeId: id,
      name: sequence.name,
      extra: sequence.extra,
    };
    await db
      .insert(schema.sequence)
      .values(recipeSequence);
  }

  // Update allergens - delete existing and insert new ones
  await db
    .delete(schema.allergenToRecipe)
    .where(eq(schema.allergenToRecipe.recipeId, id));

  if (allergens) {
    for (const allergenId of allergens) {
      const allergenToRecipe: AllergenToRecipe = {
        recipeId: id,
        allergenId: allergenId,
      };
      await db
        .insert(schema.allergenToRecipe)
        .values(allergenToRecipe);
    }
  }

  // Update ustensils - delete existing and insert new ones
  await db
    .delete(schema.recipeToUstensil)
    .where(eq(schema.recipeToUstensil.recipeId, id));

  for (const ustensilId of ustensils) {
    const recipeToUstensil: RecipeToUstensil = {
      recipeId: id,
      ustensilId: ustensilId,
    };
    await db
      .insert(schema.recipeToUstensil)
      .values(recipeToUstensil);
  }

  return updatedRecipe;
});
