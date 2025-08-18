import { updateRecipe, getRecipeBasic } from '~~/server/data/recipes';
import { idSchema } from '~/schemas/businessObjects';
import { recipeCreation } from '~/schemas/creation/recipe';
import type { Recipe, RecipeIngredient, Sequence, AllergenToRecipe, RecipeToUstensil } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { id } = await getValidatedRouterParams(event, idSchema.parse);
  const body = await readValidatedBody(event, recipeCreation.parse);
  
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
  await useDrizzle()
    .delete(tables.recipeIngredient)
    .where(eq(tables.recipeIngredient.recipeId, id));
    
  for (const ingredient of ingredients) {
    const recipeIngredient: RecipeIngredient = {
      recipeId: id,
      ingredientId: ingredient.ingredientId,
      quantity: ingredient.quantity,
      unitId: ingredient.unitId,
    };
    await useDrizzle()
      .insert(tables.recipeIngredient)
      .values(recipeIngredient);
  }
  
  // Update sequences - delete existing and insert new ones
  await useDrizzle()
    .delete(tables.sequence)
    .where(eq(tables.sequence.recipeId, id));
    
  for (const sequence of sequences) {
    const recipeSequence: Sequence = {
      recipeId: id,
      name: sequence.name,
      extra: sequence.extra,
    };
    await useDrizzle()
      .insert(tables.sequence)
      .values(recipeSequence);
  }
  
  // Update allergens - delete existing and insert new ones
  await useDrizzle()
    .delete(tables.allergenToRecipe)
    .where(eq(tables.allergenToRecipe.recipeId, id));
    
  if (allergens) {
    for (const allergenId of allergens) {
      const allergenToRecipe: AllergenToRecipe = {
        recipeId: id,
        allergenId: allergenId,
      };
      await useDrizzle()
        .insert(tables.allergenToRecipe)
        .values(allergenToRecipe);
    }
  }
  
  // Update ustensils - delete existing and insert new ones
  await useDrizzle()
    .delete(tables.recipeToUstensil)
    .where(eq(tables.recipeToUstensil.recipeId, id));
    
  for (const ustensilId of ustensils) {
    const recipeToUstensil: RecipeToUstensil = {
      recipeId: id,
      ustensilId: ustensilId,
    };
    await useDrizzle()
      .insert(tables.recipeToUstensil)
      .values(recipeToUstensil);
  }
  
  return updatedRecipe;
});