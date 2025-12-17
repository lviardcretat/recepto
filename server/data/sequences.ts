import type { Sequence, SequenceInsert } from '../utils/drizzleUtils';

export async function getSequences(): Promise<Sequence[]> {
  const sequences: Sequence[] = await db
    .select()
    .from(schema.sequence)
    .all();
  return sequences;
}

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

export async function getSequence(id: number): Promise<Sequence | undefined> {
  const sequence: Sequence | undefined = await db
    .select()
    .from(schema.sequence)
    .where(eq(schema.sequence.id, id))
    .get();
  return sequence;
}
