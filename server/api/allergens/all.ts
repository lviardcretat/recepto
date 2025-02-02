import { getAllergens } from '~/server/data/allergens';

export default defineEventHandler(async () => {
	const allergens = await getAllergens();
	if (!allergens) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Allergens not found',
		});
	}
	return allergens;
});
