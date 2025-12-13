import { count } from 'drizzle-orm';
import type { Ustensil, UstensilInsert } from '../utils/drizzleUtils';

export async function getUstensils(): Promise<Ustensil[]> {
  const ustensils: Ustensil[] = await db
    .select()
    .from(schema.ustensil)
    .orderBy(schema.ustensil.name)
    .all();
  return ustensils;
}

export async function getUstensilsDashboard(userId: number): Promise<Partial<Ustensil>[]> {
  const ustensils = await db.query.ustensil.findMany({
    columns: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    extras: (ustensil, { sql }) => ({
      recipesCount: sql<number>`(
      select count(*) from ${schema.recipeToUstensil}
      where ${schema.recipeToUstensil.ustensilId} = ${ustensil.id}
    )`.as('recipes_count'),
    }),
    where: (ustensil, { eq }) => eq(ustensil.createdById, userId),
  });
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

export async function updateUstensil(
  id: number,
  data: Partial<UstensilInsert>,
): Promise<Ustensil> {
  const updatedUstensil: Ustensil = await db
    .update(schema.ustensil)
    .set(data)
    .where(eq(schema.ustensil.id, id))
    .returning()
    .get();
  return updatedUstensil;
}

export async function deleteUstensil(id: number): Promise<void> {
  await db
    .delete(schema.ustensil)
    .where(eq(schema.ustensil.id, id));
}
