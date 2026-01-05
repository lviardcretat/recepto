import type { SelectMenuItem } from '@nuxt/ui';
import type { IGeneralSelectMenuData } from '~/types/filter/selectMenu';

/**
 * Transforms database items to SelectMenu component format.
 * @param items - The items list to map
 * @returns Array of SelectMenuItem objects with id, label, and type
 */
export default function<T extends IGeneralSelectMenuData>(items: T[] | null): SelectMenuItem[] {
  if (items == null || items.length === 0) {
    return [];
  }
  const selectMenuItem: SelectMenuItem[] = items.map((item: T) => {
    return {
      id: item.id,
      label: item.name,
      type: 'item',
    };
  });
  return selectMenuItem;
}
