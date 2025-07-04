<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { t } = useI18n();
const modalTitle: Ref<string> = ref('');
const isModalOpen = ref(false);
const items = computed(
  () =>
[
  {
    label: t('ingredient'),
    icon: 'fluent:food-carrot-24-filled',
    onSelect: () => {
      isModalOpen.value = true;
      modalTitle.value = 'ingredient';
    },
  },
  {
    label: t('recipe'),
    icon: 'material-symbols:fastfood',
    onSelect: () => {
      isModalOpen.value = true;
      modalTitle.value = 'recipe';
    },
  },
  {
    label: t('category'),
    icon: 'tabler:category-filled',
    onSelect: () => {
      isModalOpen.value = true;
      modalTitle.value = 'category';
    },
  },
  {
    label: t('ustensil'),
    icon: 'solar:ladle-bold',
    onSelect: () => {
      isModalOpen.value = true;
      modalTitle.value = 'ustensil';
    },
  },
] satisfies DropdownMenuItem,
);
</script>

<template>
  <UDropdownMenu
    class="absolute bottom-10 right-10 z-20"
    :items="items"
    size="xl"
    :content="{
      align: 'end',
      side: 'top',
      sideOffset: 16,
    }"
  >
    <UButton
      color="primary"
      size="xl"
      class="rounded-full"
      icon="material-symbols:add"
    />
  </UDropdownMenu>
  <UModal
    v-model:open="isModalOpen"
    :dismissible="false"
    :class="`max-h-10/12 ${modalTitle === 'recipe' ? 'max-w-6xl h-full' : 'max-w-4xl'}`"
  >
    <template #content>
      <CreationUstensilModalComponent
        v-if="modalTitle === 'ustensil'"
        :modal-title="modalTitle"
        @close-modal="isModalOpen = false"
      />
      <CreationIngredientModalComponent
        v-if="modalTitle === 'ingredient'"
        :modal-title="modalTitle"
        @close-modal="isModalOpen = false"
      />
      <CreationRecipesCategoryModalComponent
        v-if="modalTitle === 'category'"
        :modal-title="modalTitle"
        @close-modal="isModalOpen = false"
      />
      <CreationRecipeModalComponent
        v-if="modalTitle === 'recipe'"
        :modal-title="modalTitle"
        @close-modal="isModalOpen = false"
      />
    </template>
  </UModal>
</template>

<style lang="scss" scoped>

</style>
