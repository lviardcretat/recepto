import type { DishType } from '../utils/drizzleUtils';

/**
 * Retrieves all dish types from the database.
 * @returns Array of all dish types
 */
export async function getDishTypes(): Promise<DishType[]> {
  const dishTypes: DishType[] = await db
    .select()
    .from(schema.dishType)
    .all();
  return dishTypes;
}

/**
 * Retrieves a dish type by its ID.
 * @param id - The unique identifier of the dish type
 * @returns The dish type if found, undefined otherwise
 */
export async function getDishType(id: number): Promise<DishType | undefined> {
  const dishType: DishType | undefined = await db
    .select()
    .from(schema.dishType)
    .where(eq(schema.dishType.id, id))
    .get();
  return dishType;
}
