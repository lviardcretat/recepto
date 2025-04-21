import type { SelectMenuItem } from '@nuxt/ui';
import type { GeneralSelectMenuData } from './types/filter';

export function formatDuration(duration: number | null | undefined): string {
	if (!duration) {
		return '0m';
	}
	if (duration % 1 === 0) {
		return `${duration}h`;
	}
	return `${duration * 100}m`;
}

/**
 * Transforms the data received by the bdd to match the type required by the component SelectMenu.
 * @param newItems The filter list to map.
 */
export const useMapSelectMenuItems = <T extends GeneralSelectMenuData>(
	newItems: T[] | null,
): SelectMenuItem[] => {
	if (newItems == null || newItems.length === 0) {
		return [];
	}
	const items: SelectMenuItem[] = newItems.map((item: T) => {
		return {
			id: item.id,
			label: item.name,
			type: 'item',
		};
	});
	return items;
};
