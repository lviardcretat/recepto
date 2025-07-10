import type {
  RecipeIngredient,
  RecipeIngredientInsert,
} from '../utils/drizzleUtils';

export async function getRecipeIngredients(): Promise<RecipeIngredient[]> {
  const recipeIngredients: RecipeIngredient[] = await useDrizzle()
    .select()
    .from(tables.recipeIngredient)
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
  await useDrizzle()
    .insert(tables.recipeIngredient)
    .values(recipeIngredientInsert);
}

export async function getRecipeIngredient(
  id: number,
): Promise<RecipeIngredient | undefined> {
  const recipeIngredient: RecipeIngredient | undefined = await useDrizzle()
    .select()
    .from(tables.recipeIngredient)
    .where(eq(tables.recipeIngredient.id, id))
    .get();
  return recipeIngredient;
}
