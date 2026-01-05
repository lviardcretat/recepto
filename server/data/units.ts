import type { Unit } from '../utils/drizzleUtils';

/**
 * Retrieves all units from the database.
 * @returns Array of all units
 */
export async function getUnits(): Promise<Unit[]> {
  const units: Unit[] = await db.select().from(schema.unit).all();
  return units;
}

/**
 * Retrieves a unit by its ID.
 * @param id - The unique identifier of the unit
 * @returns The unit if found, undefined otherwise
 */
export async function getUnit(id: number): Promise<Unit | undefined> {
  const unit: Unit | undefined = await db
    .select()
    .from(schema.unit)
    .where(eq(schema.unit.id, id))
    .get();
  return unit;
}
