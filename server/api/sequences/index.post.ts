import { sequenceCreation } from '~/schemas/creation/sequence';
import { postSequence } from '~~/server/data/sequences';
import type { Sequence } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, sequenceCreation.parse);
  const sequence: Sequence = await postSequence(
    body.title,
    body.description,
    body.recipeId,
    1,
  );
  return sequence;
});
