import { inArray } from 'drizzle-orm';
import type { FoodType } from '../utils/drizzleUtils';

/**
 * Retrieves all food types from the database.
 * @returns Array of all food types
 */
export async function getFoodTypes(): Promise<FoodType[]> {
  const foodTypes: FoodType[] = await db
    .select()
    .from(schema.foodType)
    .all();
  return foodTypes;
}

/**
 * Retrieves specific food types by their IDs.
 * @param ids - Array of food type IDs to retrieve
 * @returns Array of food types matching the given IDs
 */
export async function getSpecificsFoodTypes(
  ids: number[],
): Promise<FoodType[]> {
  const foodTypes: FoodType[] = await db
    .select()
    .from(schema.foodType)
    .where(inArray(schema.foodType.id, ids))
    .all();
  return foodTypes;
}

/**
 * Retrieves a food type by its ID.
 * @param id - The unique identifier of the food type
 * @returns The food type if found, undefined otherwise
 */
export async function getFoodType(id: number): Promise<FoodType | undefined> {
  const foodType: FoodType | undefined = await db
    .select()
    .from(schema.foodType)
    .where(eq(schema.foodType.id, id))
    .get();
  return foodType;
}
