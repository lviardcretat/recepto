import type { Ustensil, UstensilInsert } from '../utils/drizzleUtils';

export async function getUstensils(): Promise<Ustensil[]> {
	const ustensils: Ustensil[] = await useDrizzle()
		.select()
		.from(tables.ustensil)
		.all();
	return ustensils;
}

export async function postUstensil(
	name: string,
	createdById: number,
): Promise<Ustensil> {
	const ustensilInsert: UstensilInsert = {
		name: name,
		createdById: createdById,
		createdAt: new Date(),
	};
	const ustensil: Ustensil = await useDrizzle()
		.insert(tables.ustensil)
		.values(ustensilInsert)
		.returning()
		.get();
	return ustensil;
}

export async function getUstensil(id: number): Promise<Ustensil | undefined> {
	const ustensil: Ustensil | undefined = await useDrizzle()
		.select()
		.from(tables.ustensil)
		.where(eq(tables.ustensil.id, id))
		.get();
	return ustensil;
}
