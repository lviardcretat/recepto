import { getAllergens } from '~/server/data/allergens';

export default defineEventHandler(async (_event) => {
	const allergens = await getAllergens();
	return allergens;
});
