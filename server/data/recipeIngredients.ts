import type {
  RecipeIngredient,
  RecipeIngredientInsert,
} from '../utils/drizzleUtils';

export async function getRecipeIngredients(): Promise<RecipeIngredient[]> {
  const recipeIngredients: RecipeIngredient[] = await db
    .select()
    .from(schema.recipeIngredient)
    .all();
  return recipeIngredients;
}

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
