<script setup lang="ts">
import type { RecipeWithLessData } from '~/types/filter';

const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();
const route = useRoute();

const nuxtApp = useNuxtApp();
const isModalOpen: Ref<boolean> = ref(false);
const recipeActive: Ref<RecipeWithLessData | undefined> = ref();

await callOnce(
  async () => {
    resultsStates.value.recipes = (await FilterUtils.fetchFilteredItems(
      selectMenuStates.value,
      iconsGridStates.value,
      switchStates.value,
      route.params.id,
    )) as RecipeWithLessData[];
  },
  { mode: 'navigation' },
);

nuxtApp.hook('recipe:created', async () => {
  resultsStates.value.recipes = (await FilterUtils.fetchFilteredItems(
    selectMenuStates.value,
    iconsGridStates.value,
    switchStates.value,
    route.params.id,
  )) as RecipeWithLessData[];
});
</script>

<template>
  <div class="alternative-recipes-selection-content">
    <UPageColumns>
      <SelectionRecipeCardComponent
        v-for="recipe in resultsStates.recipes"
        :key="recipe.id"
        :name="recipe.name"
        :description="recipe.description"
        :people-number="recipe.peopleNumber ?? 1"
        :preparation-time="recipe.preparationTime ?? 0"
        :cooking-time="recipe.cookingTime ?? 0"
        :rest-time="recipe.restTime ?? 0"
        :created-at="new Date(recipe.createdAt)"
        :full-name="recipe.createdBy ?? 'Nom inconnu'"
        @click="recipeActive = recipe; isModalOpen = true"
      />
    </UPageColumns>

    <UModal
      v-model:open="isModalOpen"
      class="max-w-4xl"
    >
      <template #body>
        <SelectionRecipeCardDetailsComponent :recipe-id="recipeActive?.id ?? 1" />
      </template>
    </UModal>
  </div>
</template>

<style lang="scss">
</style>
