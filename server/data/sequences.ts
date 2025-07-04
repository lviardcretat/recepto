import type { Sequence, SequenceInsert } from '../utils/drizzleUtils';

export async function getSequences(): Promise<Sequence[]> {
  const sequences: Sequence[] = await useDrizzle()
    .select()
    .from(tables.sequence)
    .all();
  return sequences;
}

export async function postSequence(
  title: string,
  description: string,
  recipeId: number,
  createdById: number,
): Promise<Sequence> {
  const sequenceInsert: SequenceInsert = {
    title: title,
    description: description,
    recipeId: recipeId,
    createdById: createdById,
  };
  const sequence: Sequence = await useDrizzle()
    .insert(tables.sequence)
    .values(sequenceInsert)
    .returning()
    .get();
  return sequence;
}

export async function getSequence(id: number): Promise<Sequence | undefined> {
  const sequence: Sequence | undefined = await useDrizzle()
    .select()
    .from(tables.sequence)
    .where(eq(tables.sequence.id, id))
    .get();
  return sequence;
}
