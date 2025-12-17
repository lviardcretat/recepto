<script lang="ts" setup>
import AnonymousRestrictionModalComponent from '../auth/AnonymousRestrictionModalComponent.vue';

const { t } = useI18n();
const modalTitle = ref<string>('');
const isDropdownMenuOpen = ref<boolean>(false);
const { user } = useUserSession();
const isModalOpen = ref(false);
const overlay = useOverlay();
const anonymousRestrictionModal = overlay.create(AnonymousRestrictionModalComponent);

function handleButtonClick() {
  if (user.value?.isAnonymous) {
    anonymousRestrictionModal.open();
    isDropdownMenuOpen.value = false;
  }
  return;
}

function handleItemSelect(itemType: string) {
  isModalOpen.value = true;
  modalTitle.value = itemType;
}

const items = computed(
  () =>
    [
      {
        label: t('ingredient'),
        icon: 'i-lucide-carrot',
        onSelect: () => handleItemSelect('ingredient'),
      },
      {
        label: t('recipe'),
        icon: 'i-lucide-cooking-pot',
        onSelect: () => handleItemSelect('recipe'),
      },
      {
        label: t('category'),
        icon: 'i-lucide-box',
        onSelect: () => handleItemSelect('category'),
      },
      {
        label: t('ustensil'),
        icon: 'i-lucide-lab-whisk',
        onSelect: () => handleItemSelect('ustensil'),
      },
    ],
);
</script>

<template>
  <UDropdownMenu
    v-model:open="isDropdownMenuOpen"
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
      icon="i-lucide-plus"
      @click="handleButtonClick"
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

<style lang="scss">

</style>
