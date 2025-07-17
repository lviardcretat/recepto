import { count } from 'drizzle-orm';
import type { Ustensil, UstensilInsert } from '../utils/drizzleUtils';

export async function getUstensils(): Promise<Ustensil[]> {
  const ustensils: Ustensil[] = await useDrizzle()
    .select()
    .from(tables.ustensil)
    .orderBy(tables.ustensil.name)
    .all();
  return ustensils;
}

export async function getUstensilsDashboard(userId: number): Promise<Partial<Ustensil>[]> {
  const ustensils = await useDrizzle().query.ustensil.findMany({
    columns: {
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    extras: (ustensil, { sql }) => ({
      recipesCount: sql<number>`(
      select count(*) from ${tables.recipeToUstensil}
      where ${tables.recipeToUstensil.ustensilId} = ${ustensil.id}
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
  const ustensilCreated: Ustensil = await useDrizzle()
    .insert(tables.ustensil)
    .values(ustensilInsert).returning().get();
  return ustensilCreated;
}

export async function getUstensil(id: number): Promise<Ustensil | undefined> {
  const ustensil: Ustensil | undefined = await useDrizzle()
    .select()
    .from(tables.ustensil)
    .where(eq(tables.ustensil.id, id))
    .get();
  return ustensil;
}
