import type { Ingredient, IngredientInsert } from '../utils/drizzleUtils';

/**
 * Retrieves all ingredients from the database ordered by name.
 * @returns Array of all ingredients
 */
export async function getIngredients(): Promise<Ingredient[]> {
  const ingredients: Ingredient[] = await db
    .select()
    .from(schema.ingredient)
    .orderBy(schema.ingredient.name)
    .all();
  return ingredients;
}

/**
 * Retrieves ingredients for the dashboard view with related recipes.
 * @param userId - The ID of the user who created the ingredients
 * @returns Array of ingredients with partial data and recipe associations
 */
export async function getIngredientsDashboard(userId: number): Promise<Partial<Ingredient>[]> {
  const ingredients = await db.query.ingredient.findMany({
    columns: {
      id: true,
      name: true,
      foodTypeId: true,
      seasonalMonths: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      recipes: true,
    },
    where: (ustensil, { eq }) => eq(ustensil.createdById, userId),
  });
  return ingredients;
}

/**
 * Creates a new ingredient in the database.
 * @param name - The name of the ingredient
 * @param foodTypeId - The ID of the food type category
 * @param seasonalMonths - Optional array of seasonal month ranges
 * @param createdById - The ID of the user creating the ingredient
 * @returns The newly created ingredient
 */
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

/**
 * Retrieves ingredients with their seasonal months filtered by food type.
 * @param foodTypeId - The ID of the food type to filter by
 * @returns Array of ingredients with name, seasonal months, and food type name
 */
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

/**
 * Retrieves an ingredient by its ID.
 * @param id - The unique identifier of the ingredient
 * @returns The ingredient if found, undefined otherwise
 */
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

/**
 * Updates an ingredient with new data.
 * @param id - The unique identifier of the ingredient to update
 * @param data - The partial ingredient data to update
 * @returns The updated ingredient
 */
export async function updateIngredient(
  id: number,
  data: Partial<IngredientInsert>,
): Promise<Ingredient> {
  const updatedIngredient: Ingredient = await db
    .update(schema.ingredient)
    .set(data)
    .where(eq(schema.ingredient.id, id))
    .returning()
    .get();
  return updatedIngredient;
}

/**
 * Deletes an ingredient by its ID.
 * @param id - The unique identifier of the ingredient to delete
 */
export async function deleteIngredient(id: number): Promise<void> {
  await db
    .delete(schema.ingredient)
    .where(eq(schema.ingredient.id, id));
}
