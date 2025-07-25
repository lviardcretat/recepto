import { getSpecificsFoodTypes } from '~~/server/data/foodTypes';
import { getIngredientsSeasonalMonths } from '~~/server/data/ingredients';
import type { FoodType } from '~~/server/utils/drizzleUtils';

export type DataRecord = {
  name: string;
  startMonth: number;
  endMonth: number;
  typeId: number;
  inactive: boolean;
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
        if (ingredient.seasonalMonths) {
          const data: DataRecord[] = [];
          // TODO à fixer
          const seasonalMonths = ingredient.seasonalMonths as number[][];
          seasonalMonths.map((seasonalMonth) => {
            data.push({
              name: ingredient.name,
              startMonth: seasonalMonth ? seasonalMonth[0] : 0,
              endMonth: seasonalMonth ? seasonalMonth[1] : 12,
              typeId: foodType.id,
              inactive: false,
            });
            return seasonalMonth[0];
          });
          return data;
        }
        return [];
      },
    );

    datasets = datasets.concat(dataRecords);
  }

  return datasets;
});
