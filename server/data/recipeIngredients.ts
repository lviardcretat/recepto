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
  unitId: number,
  recipeId: number,
): Promise<RecipeIngredient> {
  const recipeIngredientInsert: RecipeIngredientInsert = {
    ingredientId: ingredientId,
    quantity: quantity,
    unitId: unitId,
    recipeId: recipeId,
  };
  const recipeIngredient: RecipeIngredient = await useDrizzle()
    .insert(tables.recipeIngredient)
    .values(recipeIngredientInsert)
    .returning()
    .get();
  return recipeIngredient;
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
