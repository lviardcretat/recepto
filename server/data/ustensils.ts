import type { Ustensil, UstensilInsert } from '../utils/drizzleUtils';

export async function getUstensils(): Promise<Ustensil[]> {
  const ustensils: Ustensil[] = await db
    .select()
    .from(schema.ustensil)
    .orderBy(schema.ustensil.name)
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
  };
  const ustensilCreated: Ustensil = await db
    .insert(schema.ustensil)
    .values(ustensilInsert).returning().get();
  return ustensilCreated;
}

export async function getUstensil(id: number): Promise<Ustensil | undefined> {
  const ustensil: Ustensil | undefined = await db
    .select()
    .from(schema.ustensil)
    .where(eq(schema.ustensil.id, id))
    .get();
  return ustensil;
}
