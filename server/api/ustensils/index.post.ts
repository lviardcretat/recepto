import { ustensilCreationSchema } from '~/schemas/creation/ustensil';
import { postUstensil } from '~~/server/data/ustensils';
import { FirstLetterUppercase } from '~~/server/utils/stringUtils';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session && !session.user.isAnonymous) {
    const body = await readValidatedBody(event, ustensilCreationSchema.parse);
    const ustensilCreated: Ustensil = await postUstensil(FirstLetterUppercase(body.name), +session.user.id);
    return ustensilCreated;
  }
});
