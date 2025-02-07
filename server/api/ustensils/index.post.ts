import { ustensilCreationSchema } from '~/global/validationSchemas';
import { postUstensil } from '~/server/data/ustensils';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, ustensilCreationSchema.parse);
	const ustensil = await postUstensil(body.name, 1);
	return ustensil;
});
