<script lang="ts" setup>
import { SeasonalChartComponent } from '#components';
import type { DropdownMenuItem, } from '@nuxt/ui';
import { getDashboardSidebarConfig } from '~/config/layout/DashboardSidebarConfig';

defineShortcuts({
  shift_s: {
    usingInput: false,
    handler: () => {
      if (modal.isOpen) {
        modal.close();
      }
      else {
        modal.open();
      }
    },
  },
});

const { t } = useI18n();
const overlay = useOverlay();
const modal = overlay.create(SeasonalChartComponent);
const dashboardSidebarConfig = getDashboardSidebarConfig(t, { onSeasonalIngredientsSelected: modal.open });
</script>

<template>
  <UDashboardSidebar
    id="default"
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
        :items="dashboardSidebarConfig"
        orientation="vertical"
        tooltip
        popover
        :ui="{ linkLabel: 'inherit' }"
      >
        <template #shortcut-label="{ item }: {item: DropdownMenuItem}">
          <div class="flex items-center justify-between">
            {{ item.label }}
            <div class="flex items-center gap-1">
              <UKbd value="shift" />
              <UKbd value="S" />
            </div>
          </div>
        </template>
      </UNavigationMenu>
      <LayoutDynamicSidebarSection :collapsed="collapsed" />
    </template>

    <template #footer="{ collapsed }">
      <UserMenuComponent :collapsed="collapsed" />
    </template>
  </UDashboardSidebar>
</template>

<style>

</style>
