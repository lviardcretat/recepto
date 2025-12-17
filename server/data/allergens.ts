import type { Allergen } from '../utils/drizzleUtils';

export async function getAllergens(): Promise<Allergen[]> {
  const allergens: Allergen[] = await db
    .select()
    .from(schema.allergen)
    .all();
  return allergens;
}

export async function getAllergen(id: number): Promise<Allergen | undefined> {
  const allergen: Allergen | undefined = await db
    .select()
    .from(schema.allergen)
    .where(eq(schema.allergen.id, id))
    .get();
  return allergen;
}
