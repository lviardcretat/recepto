import type { Ustensil, UstensilInsert } from '../utils/drizzleUtils';

/**
 * Retrieves all utensils from the database ordered by name.
 * @returns Array of all utensils
 */
export async function getUstensils(): Promise<Ustensil[]> {
  const ustensils: Ustensil[] = await db
    .select()
    .from(schema.ustensil)
    .orderBy(schema.ustensil.name)
    .all();
  return ustensils;
}

/**
 * Retrieves utensils for the dashboard view with recipe count.
 * @param userId - The ID of the user who created the utensils
 * @returns Array of utensils with partial data and recipe count
 */
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

/**
 * Creates a new utensil in the database.
 * @param name - The name of the utensil
 * @param createdById - The ID of the user creating the utensil
 * @returns The newly created utensil
 */
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

/**
 * Retrieves a utensil by its ID.
 * @param id - The unique identifier of the utensil
 * @returns The utensil if found, undefined otherwise
 */
export async function getUstensil(id: number): Promise<Ustensil | undefined> {
  const ustensil: Ustensil | undefined = await db
    .select()
    .from(schema.ustensil)
    .where(eq(schema.ustensil.id, id))
    .get();
  return ustensil;
}

/**
 * Updates a utensil with new data.
 * @param id - The unique identifier of the utensil to update
 * @param data - The partial utensil data to update
 * @returns The updated utensil
 */
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

/**
 * Deletes a utensil by its ID.
 * @param id - The unique identifier of the utensil to delete
 */
export async function deleteUstensil(id: number): Promise<void> {
  await db
    .delete(schema.ustensil)
    .where(eq(schema.ustensil.id, id));
}
