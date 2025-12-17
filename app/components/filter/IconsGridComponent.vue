<script lang="ts" setup>
import type { FilterIconsGridStatesType } from '~/enums/filter';
import type { IRecipeWithLessData } from '~/types/recipe/detail';
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';

defineProps<{ dataType: FilterIconsGridStatesType }>();

const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();
const route = useRoute();

async function fetchFilteredItems() {
  const result = await FilterUtils.fetchFilteredItems(
    selectMenuStates.value,
    iconsGridStates.value,
    switchStates.value,
    route.params.id ?? null,
  );
  if (route.params.id) {
    resultsStates.value.recipes = result as IRecipeWithLessData[];
  }
  resultsStates.value.recipesCategories = result.filter<IRecipesCategoriesWithLessData>(
    TypeGuardUtils.isIRecipesCategoriesWithLessData,
  );
}
</script>

<template>
  <div class="grid grid-cols-3 grid-rows-2 gap-2 justify-items-center w-full">
    <UTooltip
      v-for="item in iconsGridStates[dataType]"
      :key="item.id"
      :text="item.label"
      :delay-duration="0"
      :content="{ side: 'top' }"
      class="w-6 h-6 ml-4 mr-4 mt-2 mb-2 flex items-center justify-center"
    >
      <UButton
        :icon="`allergens-icons:${item.icon}`"
        variant="ghost"
        color="primary"
        size="xl"
        :class="item.active ? 'opacity-100' : 'opacity-30'"
        @click="
          item.active = !item.active;
          useUpdateFilterIconsGrid(item.id, item.active, item.dataType);
          fetchFilteredItems();
        "
      />
    </UTooltip>
  </div>
</template>

<style lang="scss" scoped>

</style>
