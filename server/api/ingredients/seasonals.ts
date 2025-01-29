import type { ChartDataset } from 'chart.js';
import { getSpecificsFoodTypes } from '~/server/data/foodTypes';
import { getIngredientsSeasonalMonths } from '~/server/data/ingredients';

export default defineEventHandler(async () => {
	const foodTypesValid: number[] = [1, 2];
	const foodTypes = await getSpecificsFoodTypes(foodTypesValid);
	const colors: string[] = ['#f87979', '#f56109'];
	const datasets: ChartDataset<
		'bar',
		{ name: string; months: number[]; type: string }[]
	>[] = [];
	let index = 0;

	if (!foodTypes) {
		throw createError({
			statusCode: 404,
			statusMessage: 'FoodTypes not found',
		});
	}

	for (const foodType of foodTypes) {
		const ingredients = await getIngredientsSeasonalMonths(foodType.id);

		if (!ingredients) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Ingrediens seasonals not found',
			});
		}

		datasets.push({
			label: foodType.name,
			backgroundColor: colors[index],
			datalabels: {
				display: false,
			},
			parsing: {
				xAxisKey: 'months',
				yAxisKey: 'name',
			},
			data: ingredients.flatMap((ingredient) => {
				const seasonalMonths = ingredient.seasonalMonths as number[][];
				if (!seasonalMonths) {
					return {
						name: ingredient.name,
						months: [],
						type: ingredient.foodType.name,
					};
				}
				return seasonalMonths.map((monthArray) => ({
					name: ingredient.name,
					months: monthArray,
					type: ingredient.foodType.name,
				}));
			}),
		});
		index += 1;
	}

	return datasets;
});
