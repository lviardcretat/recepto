import type { MealType } from '../utils/drizzleUtils';

/**
 * Retrieves all meal types from the database.
 * @returns Array of all meal types
 */
export async function getMealTypes(): Promise<MealType[]> {
  const mealTypes: MealType[] = await db
    .select()
    .from(schema.mealType)
    .all();
  return mealTypes;
}

/**
 * Retrieves a meal type by its ID.
 * @param id - The unique identifier of the meal type
 * @returns The meal type if found, undefined otherwise
 */
export async function getMealType(id: number): Promise<MealType | undefined> {
  const mealType: MealType | undefined = await db
    .select()
    .from(schema.mealType)
    .where(eq(schema.mealType.id, id))
    .get();
  return mealType;
}
