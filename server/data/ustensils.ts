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
): Promise<void> {
  const ustensilInsert: UstensilInsert = {
    name: name,
    createdById: createdById,
  };
  await useDrizzle()
    .insert(tables.ustensil)
    .values(ustensilInsert);
}

export async function getUstensil(id: number): Promise<Ustensil | undefined> {
  const ustensil: Ustensil | undefined = await useDrizzle()
    .select()
    .from(tables.ustensil)
    .where(eq(tables.ustensil.id, id))
    .get();
  return ustensil;
}
