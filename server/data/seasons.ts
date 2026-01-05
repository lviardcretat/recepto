import type { Season } from '../utils/drizzleUtils';

/**
 * Retrieves all seasons from the database.
 * @returns Array of all seasons
 */
export async function getSeasons(): Promise<Season[]> {
  const seasons: Season[] = await db
    .select()
    .from(schema.season)
    .all();
  return seasons;
}

/**
 * Retrieves a season by its ID.
 * @param id - The unique identifier of the season
 * @returns The season if found, undefined otherwise
 */
export async function getSeason(id: number): Promise<Season | undefined> {
  const season: Season | undefined = await db
    .select()
    .from(schema.season)
    .where(eq(schema.season.id, id))
    .get();
  return season;
}
