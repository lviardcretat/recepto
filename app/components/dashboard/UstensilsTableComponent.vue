<script lang="ts" setup>
import { getUstensilsTableConfig } from '~/config/dashboard/UstensilsTableConfig';
import type { UstensilsDashboard } from '~/types/ustensilsDashboard';
import { LazyDashboardDeletionDeleteModalComponent, LazyEditionUstensilEditModalComponent } from '#components';

const { d, t, locale } = useI18n();
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const overlay = useOverlay();
const nuxtApp = useNuxtApp();

// Create modals
const editModal = overlay.create(LazyEditionUstensilEditModalComponent);
const deleteModal = overlay.create(LazyDashboardDeletionDeleteModalComponent);

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

// Handlers for edit and delete
async function handleEditButtonOpen(ustensil: UstensilsDashboard) {
  const instance = editModal.open({ ustensilId: ustensil.id });
  const result = await instance.result;
  if (result) {
    await executeUstensilsFetch();
  }
}

async function handleDeleteButtonOpen(ustensil: UstensilsDashboard) {
  const instance = deleteModal.open({
    itemName: ustensil.name,
    itemType: t('ustensil'),
  });
  const result = await instance.result;
  if (result) {
    // Perform delete operation
    await $fetch(`/api/ustensils/${ustensil.id}`, {
      method: 'DELETE',
      async onResponse() {
        await nuxtApp.callHook('ustensil:deleted', { id: ustensil.id });
        await executeUstensilsFetch();
      },
      onResponseError({ response }) {
        throw showError({
          statusCode: response.status,
          statusMessage: response.statusText,
        });
      },
    });
  }
}

const ustensilTableConfig = getUstensilsTableConfig(d, t, {
  buttonComponent: UButton,
  dropdownMenuComponent: UDropdownMenu,
  onEditButtonOpen: handleEditButtonOpen,
  onDeleteButtonOpen: handleDeleteButtonOpen,
});
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
