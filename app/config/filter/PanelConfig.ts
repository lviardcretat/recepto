import type { NavigationMenuItem } from '@nuxt/ui';
import type { Composer } from 'vue-i18n';
import { FilterIconsGridStatesType, FilterSelectMenuStatesType } from '~/enums/filter';
import type { ICustomAccordionItem } from '~/types/filter/accordion';

interface PanelConfigProps {};

export function getPanelConfig(
  t: Composer['t'],
  _props: PanelConfigProps,
): ComputedRef<(NavigationMenuItem & ICustomAccordionItem)[]> {
  return computed(() =>
    [
      {
        label: t('filter'),
        type: 'label',
        trailingIcon: 'i-lucide-filter-x',
        slot: 'filter',
      },
      /* {
        label: t('seasonalRecipes'),
        icon: 'i-lucide-sun-snow',
        slot: 'switch',
        disabled: false,
      }, */
      {
        label: t('ingredient'),
        icon: 'i-lucide-carrot',
        children: [
          {
            label: t('ingredient'),
            dataType: FilterSelectMenuStatesType.INGREDIENT,
            slot: 'select',
          },
        ],
      },
      {
        label: t('ustensil'),
        icon: 'i-lucide-lab-whisk',
        children: [
          {
            label: t('ustensil'),
            dataType: FilterSelectMenuStatesType.USTENSIL,
            slot: 'select',
          },
        ],
      },
      {
        label: t('allergens'),
        icon: 'i-lucide-wheat',
        children: [
          {
            label: t('allergens'),
            dataType: FilterIconsGridStatesType.ALLERGEN,
            slot: 'grid',
          },
        ],
      },
      {
        label: t('mealTypes'),
        icon: 'i-lucide-clock-fading',
        children: [
          {
            label: t('mealTypes'),
            dataType: FilterSelectMenuStatesType.MEAL_TYPE,
            slot: 'select',
          },
        ],
      },
      {
        label: t('dishTypes'),
        icon: 'i-lucide-cooking-pot',
        children: [
          {
            label: t('dishTypes'),
            dataType: FilterSelectMenuStatesType.DISH_TYPE,
            slot: 'select',
          },
        ],
      },
    ],
  );
}
