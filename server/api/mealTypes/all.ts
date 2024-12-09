import { getMealTypes } from '~/server/data/mealTypes';

export default defineEventHandler(async (_event) => {
	const mealTypes = await getMealTypes();
	return mealTypes;
});
