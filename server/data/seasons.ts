import type { Season } from '../utils/drizzleUtils';

export async function getSeasons(): Promise<Season[]> {
  const seasons: Season[] = await useDrizzle()
    .select()
    .from(tables.season)
    .all();
  return seasons;
}

export async function getSeason(id: number): Promise<Season | undefined> {
  const season: Season | undefined = await useDrizzle()
    .select()
    .from(tables.season)
    .where(eq(tables.season.id, id))
    .get();
  return season;
}
