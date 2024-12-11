import { getDishTypes } from '~/server/data/dishTypes';

export default defineEventHandler(async (_event) => {
	const dishTypes = await getDishTypes();
	return dishTypes;
});
