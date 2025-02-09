import type { Allergen } from '../utils/drizzle';

export async function getAllergens(): Promise<Allergen[]> {
	const allergens: Allergen[] = await useDrizzle()
		.select()
		.from(tables.allergen)
		.all();
	return allergens;
}

export async function getAllergen(id: number): Promise<Allergen | undefined> {
	const allergen: Allergen | undefined = await useDrizzle()
		.select()
		.from(tables.allergen)
		.where(eq(tables.allergen.id, id))
		.get();
	return allergen;
}
