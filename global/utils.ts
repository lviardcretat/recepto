export function formatDuration(duration: number | null): string {
	if (duration === null) {
		return '0m';
	}
	if (duration % 1 === 0) {
		return `${duration}h`;
	}
	return `${duration * 100}m`;
}
