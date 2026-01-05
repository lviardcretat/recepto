/**
 * Formats a duration in minutes to a human-readable string.
 * @param duration - The duration in minutes
 * @returns Formatted string (e.g., "30m", "2h", "1.30h")
 */
export default function (duration: number | null | undefined): string {
  if (!duration) {
    return '0m';
  }
  if (duration <= 60) {
    return `${duration}m`;
  }
  if (duration % 60 === 0) {
    return `${Math.floor(duration / 60)}h`;
  }
  return `${Math.floor(duration / 60)}.${duration % 60}h`;
}
