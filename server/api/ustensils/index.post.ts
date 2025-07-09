import { ustensilCreationSchema } from '~/schemas/creation/ustensil';
import { postUstensil } from '~~/server/data/ustensils';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const body = await readValidatedBody(event, ustensilCreationSchema.parse);
    await postUstensil(body.name, +session.user.id);
  }
});
