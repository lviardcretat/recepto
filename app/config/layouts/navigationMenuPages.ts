import type { NavigationMenuItem } from '@nuxt/ui';

const { t } = useI18n();
const NavigationMenuPagesConfig = [
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
      label: t('mainSlideOver.seasonalRecipes'),
      icon: 'i-lucide-sun-snow',
      slot: 'shortcut',
      onSelect: (_event: Event) => {
        modal.open();
      },
    },
    {
      label: t('mainSlideOver.calendar'),
      icon: 'i-lucide-calendar',
      disabled: true,
    },
  ],
  [],
] satisfies NavigationMenuItem[][];

export { NavigationMenuPagesConfig };
