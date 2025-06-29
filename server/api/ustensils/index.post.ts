import { ustensilCreationSchema } from '~/schemas/creation/ustensil';
import { postUstensil } from '~/server/data/ustensils';
import type { Ustensil } from '~/server/utils/drizzleUtils';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, ustensilCreationSchema.parse);
	const ustensil: Ustensil = await postUstensil(body.name, 1);
	return ustensil;
});
