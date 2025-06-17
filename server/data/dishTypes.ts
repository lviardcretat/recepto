import type { DishType } from '../utils/drizzleUtils';

export async function getDishTypes(): Promise<DishType[]> {
	const dishTypes: DishType[] = await useDrizzle()
		.select()
		.from(tables.dishType)
		.all();
	return dishTypes;
}

export async function getDishType(id: number): Promise<DishType | undefined> {
	const dishType: DishType | undefined = await useDrizzle()
		.select()
		.from(tables.dishType)
		.where(eq(tables.dishType.id, id))
		.get();
	return dishType;
}
