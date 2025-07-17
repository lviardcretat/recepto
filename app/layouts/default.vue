<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { SeasonalChartComponent } from '#components';

const overlay = useOverlay();
const modal = overlay.create(SeasonalChartComponent);
defineShortcuts({
  shift_s: {
    usingInput: false,
    handler: () => {
      modal.open();
    },
  },
});
const { t } = useI18n();
const open = ref(false);
const links = computed(
  () =>
[
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
] satisfies NavigationMenuItem[][],
);
</script>

<template>
  <UDashboardGroup unit="rem">
    <LayoutDashboardSidebar />
    <CustomDashboardSearchComponent />
    <CreationButtonComponent />

    <UDashboardPanel id="home">
      <template #header>
        <UDashboardNavbar
          :title="$t('recipe', 2)"
          :ui="{ right: 'gap-3' }"
        >
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <TranslationSelectComponent />
            <UColorModeButton />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<style>
  button:not(*:disabled) > .inherit {
    width: inherit;
  }
</style>
