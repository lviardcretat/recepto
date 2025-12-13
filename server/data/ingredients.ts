import type { Ingredient, IngredientInsert } from '../utils/drizzleUtils';

export async function getIngredients(): Promise<Ingredient[]> {
  const ingredients: Ingredient[] = await db
    .select()
    .from(schema.ingredient)
    .orderBy(schema.ingredient.name)
    .all();
  return ingredients;
}

export async function postIngredient(
  name: string,
  foodTypeId: number,
  seasonalMonths: number[][] | undefined,
  createdById: number,
): Promise<Ingredient> {
  const ingredientInsert: IngredientInsert = {
    name: name,
    foodTypeId: foodTypeId,
    seasonalMonths: seasonalMonths,
    createdById: createdById,
  };
  const ingredientCreated = await db
    .insert(schema.ingredient)
    .values(ingredientInsert)
    .returning()
    .get();
  return ingredientCreated;
}

export async function getIngredientsSeasonalMonths(foodTypeId: number) {
  const ingredients = await db
    .select({
      name: schema.ingredient.name,
      seasonalMonths: schema.ingredient.seasonalMonths,
      foodType: schema.foodType.name,
    })
    .from(schema.ingredient)
    .leftJoin(
      schema.foodType,
      eq(schema.ingredient.foodTypeId, schema.foodType.id),
    )
    .where(eq(schema.ingredient.foodTypeId, foodTypeId))
    .orderBy(schema.ingredient.name)
    .all();
  return ingredients;
}

export async function getIngredient(
  id: number,
): Promise<Ingredient | undefined> {
  const ingredient: Ingredient | undefined = await db
    .select()
    .from(schema.ingredient)
    .where(eq(schema.ingredient.id, id))
    .get();
  return ingredient;
}
