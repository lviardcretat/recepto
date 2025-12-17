<script setup lang="ts">
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';

const { t } = useI18n();
const nuxtApp = useNuxtApp();
const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();

await callOnce(async () => {
  resultsStates.value.recipesCategories = (await FilterUtils.fetchFilteredItems(
    selectMenuStates.value,
    iconsGridStates.value,
    switchStates.value,
  )) as IRecipesCategoriesWithLessData[];
});

function isData() {
  return (
    resultsStates.value.recipesCategories !== undefined
    && resultsStates.value.recipesCategories !== null
    && resultsStates.value.recipesCategories.length > 0
  );
}

nuxtApp.hook('recipesCategory:created', async () => {
  resultsStates.value.recipesCategories = (await FilterUtils.fetchFilteredItems(
    selectMenuStates.value,
    iconsGridStates.value,
    switchStates.value,
  )) as IRecipesCategoriesWithLessData[];
});

nuxtApp.hook('recipe:created', async () => {
  resultsStates.value.recipesCategories = (await FilterUtils.fetchFilteredItems(
    selectMenuStates.value,
    iconsGridStates.value,
    switchStates.value,
  )) as IRecipesCategoriesWithLessData[];
});

/**
 * Formats the recipe count text for a category
 */
function formatRecipeCount(count: number): string {
  return `${count} ${t('recipe', 2)}`;
}
</script>

<template>
  <UPageList
    v-if="isData()"
    divide
  >
    <UPageCard
      v-for="(recipeCategory, index) in resultsStates.recipesCategories"
      :key="index"
      variant="ghost"
      target="_self"
      :to="{ name: 'recipes-id', params: { id: recipeCategory.id }, query: { recipeIndex: 0 } }"
    >
      <div class="flex justify-between gap-8 items-center">
        <div class="flex justify-between grow items-center">
          <div>{{ recipeCategory.name }}</div>
          <div>{{ formatRecipeCount(recipeCategory.count) }}</div>
        </div>
        <UIcon
          name="material-symbols:arrow-forward-ios"
          class="size-5"
        />
      </div>
    </UPageCard>
  </UPageList>
</template>

<style lang="scss">
</style>
