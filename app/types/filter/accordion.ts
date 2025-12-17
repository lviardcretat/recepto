import type { FilterSelectMenuStatesType, FilterIconsGridStatesType } from '~/enums/filter';

/**
 * Custom accordion item with data type
 */
export interface ICustomAccordionItem {
  dataType?: FilterSelectMenuStatesType | FilterIconsGridStatesType;
}
