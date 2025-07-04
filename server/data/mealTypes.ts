import type { MealType } from '../utils/drizzleUtils';

export async function getMealTypes(): Promise<MealType[]> {
  const mealTypes: MealType[] = await useDrizzle()
    .select()
    .from(tables.mealType)
    .all();
  return mealTypes;
}

export async function getMealType(id: number): Promise<MealType | undefined> {
  const mealType: MealType | undefined = await useDrizzle()
    .select()
    .from(tables.mealType)
    .where(eq(tables.mealType.id, id))
    .get();
  return mealType;
}
