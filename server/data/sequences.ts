import type { Sequence, SequenceInsert } from '../utils/drizzleUtils';

/**
 * Retrieves all sequences from the database.
 * @returns Array of all sequences
 */
export async function getSequences(): Promise<Sequence[]> {
  const sequences: Sequence[] = await db
    .select()
    .from(schema.sequence)
    .all();
  return sequences;
}

/**
 * Creates a new sequence for a recipe.
 * @param name - The name of the sequence
 * @param extra - Optional additional information
 * @param recipeId - The ID of the associated recipe
 * @param createdById - The ID of the user creating the sequence
 */
export async function postSequence(
  name: string,
  extra: string | undefined,
  recipeId: number,
  createdById: number,
): Promise<void> {
  const sequenceInsert: SequenceInsert = {
    name: name,
    extra: extra,
    recipeId: recipeId,
    createdById: createdById,
  };
  await db
    .insert(schema.sequence)
    .values(sequenceInsert);
}

/**
 * Retrieves a sequence by its ID.
 * @param id - The unique identifier of the sequence
 * @returns The sequence if found, undefined otherwise
 */
export async function getSequence(id: number): Promise<Sequence | undefined> {
  const sequence: Sequence | undefined = await db
    .select()
    .from(schema.sequence)
    .where(eq(schema.sequence.id, id))
    .get();
  return sequence;
}
