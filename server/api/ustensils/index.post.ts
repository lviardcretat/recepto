import { ustensilCreationSchema } from '~/global/validationSchemas';
import { postUstensil } from '~/server/data/ustensils';
import type { Ustensil } from '~/server/utils/drizzle';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, ustensilCreationSchema.parse);
	const ustensil: Ustensil = await postUstensil(body.name, 1);
	return ustensil;
});
