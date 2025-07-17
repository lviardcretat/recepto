import type { Ingredient, IngredientInsert } from '../utils/drizzleUtils';

export async function getIngredients(): Promise<Ingredient[]> {
  const ingredients: Ingredient[] = await useDrizzle()
    .select()
    .from(tables.ingredient)
    .orderBy(tables.ingredient.name)
    .all();
  return ingredients;
}

export async function getIngredientsDashboard(userId: number): Promise<Partial<Ingredient>[]> {
  const ingredients = await useDrizzle().query.ingredient.findMany({
    columns: {
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
  const ingredientCreated = await useDrizzle()
    .insert(tables.ingredient)
    .values(ingredientInsert)
    .returning()
    .get();
  return ingredientCreated;
}

export async function getIngredientsSeasonalMonths(foodTypeId: number) {
  const ingredients = await useDrizzle()
    .select({
      name: tables.ingredient.name,
      seasonalMonths: tables.ingredient.seasonalMonths,
      foodType: tables.foodType.name,
    })
    .from(tables.ingredient)
    .leftJoin(
      tables.foodType,
      eq(tables.ingredient.foodTypeId, tables.foodType.id),
    )
    .where(eq(tables.ingredient.foodTypeId, foodTypeId))
    .orderBy(tables.ingredient.name)
    .all();
  return ingredients;
}

export async function getIngredient(
  id: number,
): Promise<Ingredient | undefined> {
  const ingredient: Ingredient | undefined = await useDrizzle()
    .select()
    .from(tables.ingredient)
    .where(eq(tables.ingredient.id, id))
    .get();
  return ingredient;
}
