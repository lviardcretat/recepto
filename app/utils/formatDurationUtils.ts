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
