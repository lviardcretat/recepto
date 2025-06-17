import type { Unit } from '../utils/drizzleUtils';

export async function getUnits(): Promise<Unit[]> {
	const units: Unit[] = await useDrizzle().select().from(tables.unit).all();
	return units;
}

export async function getUnit(id: number): Promise<Unit | undefined> {
	const unit: Unit | undefined = await useDrizzle()
		.select()
		.from(tables.unit)
		.where(eq(tables.unit.id, id))
		.get();
	return unit;
}
