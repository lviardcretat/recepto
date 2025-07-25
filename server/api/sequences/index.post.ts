import { sequenceCreation } from '~/schemas/creation/sequence';
import { postSequence } from '~~/server/data/sequences';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const body = await readValidatedBody(event, sequenceCreation.parse);
    await postSequence(
      body.name,
      body.extra,
      body.recipeId,
      +session.user.id,
    );
  }
});
