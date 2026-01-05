import type { Allergen } from '../utils/drizzleUtils';

/**
 * Retrieves all allergens from the database.
 * @returns Array of all allergens
 */
export async function getAllergens(): Promise<Allergen[]> {
  const allergens: Allergen[] = await db
    .select()
    .from(schema.allergen)
    .all();
  return allergens;
}

/**
 * Retrieves an allergen by its ID.
 * @param id - The unique identifier of the allergen
 * @returns The allergen if found, undefined otherwise
 */
export async function getAllergen(id: number): Promise<Allergen | undefined> {
  const allergen: Allergen | undefined = await db
    .select()
    .from(schema.allergen)
    .where(eq(schema.allergen.id, id))
    .get();
  return allergen;
}
