import type { SelectMenuItem } from '@nuxt/ui';
import type { GeneralSelectMenuData } from '../types/filter';

/**
 * Transforms the data received by the bdd to match the type required by the component SelectMenu.
 * @param items The items list to map.
 */
export default function<T extends GeneralSelectMenuData>(items: T[] | null): SelectMenuItem[] {
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
