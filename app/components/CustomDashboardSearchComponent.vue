<script lang="ts" setup>
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui';
import type { RecipeSearched } from '~/types/search';

const nuxtApp = useNuxtApp();
const searchValue = ref({});
const { data, execute, refresh } = await useRecipesCategoriesRequest().getSearch(
  { name: searchValue },
  {
    watch: false,
    immediate: false,
    default: () => [],
    transform: (recipesCategoriesRecipes: RecipeSearched[]) => {
      return recipesCategoriesRecipes.map((recipesCategory) => {
        return {
          id: recipesCategory.name.toLowerCase(),
          label: recipesCategory.name,
          slot: 'recipesCategory' as const,
          items: recipesCategory.recipes.map(recipe => ({
            label: recipe.name,
            slot: 'recipe',
            to: `/recipes/${recipesCategory.id}`,
          })),
        };
      });
    },
  });

await execute();

nuxtApp.hook('recipe:created', async () => {
  await refresh();
});

const search = ref<CommandPaletteGroup<CommandPaletteItem>[]>(data.value);
</script>

<template>
  <UDashboardSearch
    v-model="searchValue"
    :color-mode="false"
    :groups="search"
  />
</template>

<style>

</style>
