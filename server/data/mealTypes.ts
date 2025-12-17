import type { MealType } from '../utils/drizzleUtils';

export async function getMealTypes(): Promise<MealType[]> {
  const mealTypes: MealType[] = await db
    .select()
    .from(schema.mealType)
    .all();
  return mealTypes;
}

export async function getMealType(id: number): Promise<MealType | undefined> {
  const mealType: MealType | undefined = await db
    .select()
    .from(schema.mealType)
    .where(eq(schema.mealType.id, id))
    .get();
  return mealType;
}
