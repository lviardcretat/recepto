<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { t } = useI18n();
const modalTitle: Ref<string> = ref('');
const isModalOpen = ref(false);
const { checkIsAnonymous, showAnonymousLimitation } = useAnonymousUser();

// Vérifier si l'utilisateur est anonyme
const isAnonymous = ref(false);
onMounted(async () => {
  isAnonymous.value = await checkIsAnonymous();
});

// Fonction pour gérer les clics avec vérification anonyme
const handleItemClick = async (itemType: string) => {
  if (isAnonymous.value) {
    const actions = {
      ingredient: 'créer un ingrédient',
      recipe: 'créer une recette',
      category: 'créer une catégorie',
      ustensil: 'créer un ustensile',
    };
    showAnonymousLimitation(actions[itemType as keyof typeof actions] || 'effectuer cette action');
    return;
  }

  isModalOpen.value = true;
  modalTitle.value = itemType;
};
const items = computed(() => [
  {
    label: t('ingredient'),
    icon: 'i-lucide-carrot',
    disabled: isAnonymous.value,
    onSelect: () => handleItemClick('ingredient'),
  },
  {
    label: t('recipe'),
    icon: 'i-lucide-cooking-pot',
    disabled: isAnonymous.value,
    onSelect: () => handleItemClick('recipe'),
  },
  {
    label: t('category'),
    icon: 'i-lucide-box',
    disabled: isAnonymous.value,
    onSelect: () => handleItemClick('category'),
  },
  {
    label: t('ustensil'),
    icon: 'i-lucide-lab-whisk',
    disabled: isAnonymous.value,
    onSelect: () => handleItemClick('ustensil'),
  },
] satisfies DropdownMenuItem[]);
</script>

<template>
  <UTooltip
    v-if="isAnonymous"
    :text="$t('auth.anonymous.createTooltip')"
    :popper="{ placement: 'top' }"
  >
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
        icon="i-lucide-plus"
        :disabled="isAnonymous"
      />
    </UDropdownMenu>
  </UTooltip>
  <UDropdownMenu
    v-else
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
