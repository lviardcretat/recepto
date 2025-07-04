import { getSpecificsFoodTypes } from '~~/server/data/foodTypes';
import { getIngredientsSeasonalMonths } from '~~/server/data/ingredients';
import type { FoodType } from '~~/server/utils/drizzleUtils';

export type DataRecord = {
  name: string;
  startMonth: number;
  endMonth: number;
  typeId: number;
};

export default defineEventHandler(async () => {
  const foodTypesValid: number[] = [1, 2];
  const foodTypes: FoodType[] = await getSpecificsFoodTypes(foodTypesValid);
  let datasets: DataRecord[] = [];

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

    const dataRecords: DataRecord[] = ingredients.flatMap<DataRecord>(
      (ingredient) => {
        const data: DataRecord[] = [];
        const seasonalMonths = ingredient.seasonalMonths as number[][];
        seasonalMonths.map((seasonalMonth) => {
          data.push({
            name: ingredient.name,
            startMonth: seasonalMonth ? seasonalMonth[0] : 0,
            endMonth: seasonalMonth ? seasonalMonth[1] : 12,
            typeId: foodType.id,
          });
          seasonalMonth[0];
        });
        return data;
      },
    );

    datasets = datasets.concat(dataRecords);
  }

  return datasets;
});
