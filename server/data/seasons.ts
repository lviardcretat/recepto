import type { Season } from '../utils/drizzleUtils';

export async function getSeasons(): Promise<Season[]> {
  const seasons: Season[] = await db
    .select()
    .from(schema.season)
    .all();
  return seasons;
}

export async function getSeason(id: number): Promise<Season | undefined> {
  const season: Season | undefined = await db
    .select()
    .from(schema.season)
    .where(eq(schema.season.id, id))
    .get();
  return season;
}
