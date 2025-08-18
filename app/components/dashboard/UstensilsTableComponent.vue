<script lang="ts" setup>
import { getUstensilsTableConfig } from '~/config/dashboard/UstensilsTableConfig';
import type { UstensilsDashboard } from '~/types/ustensilsDashboard';

const { d, t, locale } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const ustensilTableConfig = getUstensilsTableConfig(d, t, { buttonComponent: UButton, dropdownMenuComponent: UDropdownMenu,onEditButtonOpen: () => {},onDeleteButtonOpen: () => {}, });

const { data: ustensils, execute: executeUstensilsFetch } = await useFetch<UstensilsDashboard[]>(
  '/api/ustensils/dashboard',
  {
    method: 'GET',
    immediate: false,
    watch: false,
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  },
);

await executeUstensilsFetch();
</script>

<template>
  <!-- @vue-ignore -->
  <UTable
    :key="locale"
    :data="ustensils"
    :columns="ustensilTableConfig"
  >
    <template #name-cell="{ row }">
      <div
        class="flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-lab-whisk"
          class="size-5"
        />
        {{
          row.getValue('name')
        }}
      </div>
    </template>
  </UTable>
</template>

<style>

</style>
