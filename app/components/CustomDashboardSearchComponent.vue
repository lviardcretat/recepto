<script lang="ts" setup>
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui';
import type { RecipeSearched } from '~/types/search';

const toast = useToast();
const searchValue = ref({});
const { data, execute, refresh } = useFetch('/api/recipesCategories/search', {
  method: 'GET',
  query: {
    name: searchValue,
  },
  immediate: false,
  default: () => [],
  watch: false,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
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

useListen('recipe:created', async () => {
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
