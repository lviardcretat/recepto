import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import { postIngredient } from '~~/server/data/ingredients';

export default defineEventHandler(async (event) => {
  const session = await serverAuth().api.getSession({
    headers: event.headers,
  });
  if (session) {
    const body = await readValidatedBody(event, ingredientCreationSchema.parse);
    await postIngredient(
      body.name,
      body.foodTypeId,
      body.seasonalMonths,
      +session.user.id,
    );
  }
});
