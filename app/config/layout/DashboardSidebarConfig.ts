import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';
import type { Composer } from 'vue-i18n';

interface DashboardSidebarConfigProps {
  onSeasonalIngredientsSelected: () => void;
};

export function getDashboardSidebarConfig (
  t: Composer['t'],
  props: DashboardSidebarConfigProps
): ComputedRef<DropdownMenuItem[][]> {
  return computed(() => [
    [
      {
        label: t('mainSlideOver.pages'),
        type: 'label',
      },
      {
        label: t('mainSlideOver.recipes'),
        icon: 'i-lucide-cooking-pot',
        to: '/recipes/all',
      },
      {
        label: t('mainSlideOver.seasonalIngredients'),
        icon: 'i-lucide-sun-snow',
        slot: 'shortcut',
        onSelect: () => { props.onSeasonalIngredientsSelected() },
      },
      {
        label: t('mainSlideOver.calendar'),
        icon: 'i-lucide-calendar',
        disabled: true,
      },
    ],
    [],
  ] satisfies NavigationMenuItem[][])
}
