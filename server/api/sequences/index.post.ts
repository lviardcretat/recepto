import { sequenceCreation } from '~/global/validationSchemas';
import { postSequence } from '~/server/data/sequences';
import type { Sequence } from '~/server/utils/drizzle';

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
