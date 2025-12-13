import type { DishType } from '../utils/drizzleUtils';

export async function getDishTypes(): Promise<DishType[]> {
  const dishTypes: DishType[] = await db
    .select()
    .from(schema.dishType)
    .all();
  return dishTypes;
}

export async function getDishType(id: number): Promise<DishType | undefined> {
  const dishType: DishType | undefined = await db
    .select()
    .from(schema.dishType)
    .where(eq(schema.dishType.id, id))
    .get();
  return dishType;
}
