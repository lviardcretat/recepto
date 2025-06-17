export default function (duration: number | null | undefined): string {
  if (!duration) {
		return '0m';
	}
	if (duration % 1 === 0) {
		return `${duration}h`;
	}
	return `${duration * 100}m`;
}
