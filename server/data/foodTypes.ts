import { inArray } from 'drizzle-orm';
import type { FoodType } from '../utils/drizzleUtils';

export async function getFoodTypes(): Promise<FoodType[]> {
  const foodTypes: FoodType[] = await db
    .select()
    .from(schema.foodType)
    .all();
  return foodTypes;
}

export async function getSpecificsFoodTypes(
  ids: number[],
): Promise<FoodType[]> {
  const foodTypes: FoodType[] = await db
    .select()
    .from(schema.foodType)
    .where(inArray(schema.foodType.id, ids))
    .all();
  return foodTypes;
}

export async function getFoodType(id: number): Promise<FoodType | undefined> {
  const foodType: FoodType | undefined = await db
    .select()
    .from(schema.foodType)
    .where(eq(schema.foodType.id, id))
    .get();
  return foodType;
}
