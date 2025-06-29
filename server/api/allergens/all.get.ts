import { getAllergens } from '~~/server/data/allergens';
import type { Allergen } from '~~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
	const allergens: Allergen[] = await getAllergens();
	if (!allergens) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Allergens not found',
		});
	}
	return allergens;
});
