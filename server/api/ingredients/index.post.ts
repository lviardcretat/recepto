import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import { postIngredient } from '~~/server/data/ingredients';
import { FirstLetterUppercase } from '~~/server/utils/stringUtils';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const body = await readValidatedBody(event, ingredientCreationSchema.parse);
    const ingredientCreated: Ingredient = await postIngredient(
      FirstLetterUppercase(body.name),
      body.foodTypeId,
      body.seasonalMonths,
      +session.user.id,
    );
    return ingredientCreated;
  }
});
