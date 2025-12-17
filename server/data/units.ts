import type { Unit } from '../utils/drizzleUtils';

export async function getUnits(): Promise<Unit[]> {
  const units: Unit[] = await db.select().from(schema.unit).all();
  return units;
}

export async function getUnit(id: number): Promise<Unit | undefined> {
  const unit: Unit | undefined = await db
    .select()
    .from(schema.unit)
    .where(eq(schema.unit.id, id))
    .get();
  return unit;
}
