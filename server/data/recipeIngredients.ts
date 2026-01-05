import type {
  RecipeIngredient,
  RecipeIngredientInsert,
} from '../utils/drizzleUtils';

/**
 * Retrieves all recipe ingredients from the database.
 * @returns Array of all recipe ingredients
 */
export async function getRecipeIngredients(): Promise<RecipeIngredient[]> {
  const recipeIngredients: RecipeIngredient[] = await db
    .select()
    .from(schema.recipeIngredient)
    .all();
  return recipeIngredients;
}

/**
 * Creates a new recipe ingredient association.
 * @param ingredientId - The ID of the ingredient
 * @param quantity - The quantity of the ingredient
 * @param recipeId - The ID of the recipe
 * @param unitId - The optional ID of the unit of measurement
 */
export async function postRecipeIngredient(
  ingredientId: number,
  quantity: number,
  recipeId: number,
  unitId?: number,
): Promise<void> {
  const recipeIngredientInsert: RecipeIngredientInsert = {
    ingredientId: ingredientId,
    quantity: quantity,
    unitId: unitId,
    recipeId: recipeId,
  };
  await db
    .insert(schema.recipeIngredient)
    .values(recipeIngredientInsert);
}

/**
 * Retrieves a recipe ingredient by its ID.
 * @param id - The unique identifier of the recipe ingredient
 * @returns The recipe ingredient if found, undefined otherwise
 */
export async function getRecipeIngredient(
  id: number,
): Promise<RecipeIngredient | undefined> {
  const recipeIngredient: RecipeIngredient | undefined = await db
    .select()
    .from(schema.recipeIngredient)
    .where(eq(schema.recipeIngredient.id, id))
    .get();
  return recipeIngredient;
}
