import { ustensilCreationSchema } from '~/schemas/creation/ustensil';
import { postUstensil } from '~~/server/data/ustensils';
import { FirstLetterUppercase } from '~~/server/utils/stringUtils';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const body = await readValidatedBody(event, ustensilCreationSchema.parse);
    const ustensilCreated: Ustensil = await postUstensil(FirstLetterUppercase(body.name), +session.user.id);
    return ustensilCreated;
  }
});
