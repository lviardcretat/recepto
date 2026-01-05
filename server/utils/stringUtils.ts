/**
 * Converts the first letter of a string to uppercase.
 * @param name - The string to transform
 * @returns The string with its first letter capitalized
 */
export function FirstLetterUppercase(name: string): string {
  return name[0].toUpperCase() + name.slice(1);
}
