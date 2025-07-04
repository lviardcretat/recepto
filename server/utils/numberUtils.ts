/**
 * Transform a query string to an array of numbers
 *
 * @param query - The query string | string[] | undefined
 *
 * @returns An array of numbers
 */
export function QueryToNumber<T>(query: T): number[] {
  return Array.isArray(query)
    ? query.map(Number)
    : query
      ? [Number(query)]
      : [];
}

/**
 * Calculate the day of the year from 1 to 366
 *
 * @returns the day based on the today's date
 */
export function dateIntoDayNumber(): number {
  const date = new Date();
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      - Date.UTC(date.getFullYear(), 0, 0))
    / 24
    / 60
    / 60
    / 1000
  );
}
