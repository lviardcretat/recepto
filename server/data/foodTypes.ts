import { inArray } from 'drizzle-orm';
import type { FoodType } from '../utils/drizzle';

export async function getFoodTypes(): Promise<FoodType[]> {
	const foodTypes: FoodType[] = await useDrizzle()
		.select()
		.from(tables.foodType)
		.all();
	return foodTypes;
}

export async function getSpecificsFoodTypes(
	ids: number[],
): Promise<FoodType[]> {
	const foodTypes: FoodType[] = await useDrizzle()
		.select()
		.from(tables.foodType)
		.where(inArray(tables.foodType.id, ids))
		.all();
	return foodTypes;
}

export async function getFoodType(id: number): Promise<FoodType | undefined> {
	const foodType: FoodType | undefined = await useDrizzle()
		.select()
		.from(tables.foodType)
		.where(eq(tables.foodType.id, id))
		.get();
	return foodType;
}
