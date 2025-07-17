<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui';

const open = ref(false);
const { t } = useI18n();
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
] satisfies NavigationMenuItem[][],
);
</script>

<template>
  <UDashboardSidebar
    id="default"
    v-model:open="open"
    :default-size="40"
    collapsible
    resizable
    class="bg-elevated/25"
    :ui="{ footer: 'lg:border-t lg:border-default' }"
  >
    <template #header>
      <NuxtImg
        class="h-auto w-8 pt-4 pb-4"
        src="/logo.png"
      />
    </template>

    <template #default="{ collapsed }">
      <UDashboardSearchButton
        :collapsed="collapsed"
        class="bg-transparent ring-default"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="links"
        orientation="vertical"
        tooltip
        popover
        :ui="{ linkLabel: 'inherit' }"
      >
        <template #shortcut-label="{ item }">
          <div class="flex items-center justify-between">
            {{ $t(item.label ?? "") }}
            <div class="flex items-center gap-1">
              <UKbd value="shift" />
              <UKbd value="S" />
            </div>
          </div>
        </template>
      </UNavigationMenu>
      <FilterPanelComponent :collapsed="collapsed" />
    </template>

    <template #footer="{ collapsed }">
      <UserMenuComponent :collapsed="collapsed" />
    </template>
  </UDashboardSidebar>
</template>

<style>

</style>
