<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui';
import type { FilterSelectMenuStatesType } from '~/enums/filter';
import type { ICustomSelectMenuItem } from '~/types/filter/selectMenu';
import type { IRecipeWithLessData } from '~/types/recipe/detail';
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';

const props = defineProps<{
  placeholder: string;
  dataType: FilterSelectMenuStatesType;
}>();
const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();
const selectedItemsStates = useFilterSelectedItemsStates();
const route = useRoute();

function getButtonsColor(
  selectMenuItem: SelectMenuItem & ICustomSelectMenuItem,
  isWanted: boolean,
): string {
  if (selectMenuItem.notWanted) {
    return isWanted ? 'opacity-20' : 'opacity-100';
  }
  if (selectMenuItem.wanted) {
    return isWanted ? 'opacity-100' : 'opacity-20';
  }
  return 'opacity-20';
}

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
  <div>
    <div class="mb-2 flex flex-wrap h-auto">
      <!-- @vue-ignore -->
      <UBadge
        v-for="item of selectedItemsStates[props.dataType]"
        :key="item.id"
        class="h-6 m-0.5"
        :color="item.wanted ? 'primary' : 'error'"
        size="md"
        variant="solid"
        :label="item.label"
      />
    </div>
    <USelectMenu
      :items="selectMenuStates[props.dataType]"
      class="w-full"
      multiple
      :placeholder="$t('filterBy', { filterName: props.placeholder.toLocaleLowerCase() })"
      searchable
      :searchable-placeholder="$t('filterBy', { filterName: props.placeholder.toLocaleLowerCase() })"
      :ui="{ itemTrailing: 'hidden' }"
    >
      <template #default>
        <span v-if="selectedItemsStates[props.dataType].length">{{
          $t('selected', { count: selectedItemsStates[dataType].length }, selectedItemsStates[dataType].length)
        }}</span>
        <span v-else>{{ $t('filterBy', { filterName: props.placeholder.toLocaleLowerCase() }) }}</span>
      </template>
      <template #item-leading="{ item }">
        <UButton
          :padded="false"
          variant="link"
          icon="i-lucide-circle"
          :class="getButtonsColor(item, true)"
          :ui="{
            base: 'p-0',
          }"
          @click="
            useUpdateFilterSelectMenu(item, true, props.dataType);
            fetchFilteredItems();
          "
        />
        <UButton
          :padded="false"
          variant="link"
          icon="i-lucide-circle-slash-2"
          :class="getButtonsColor(item, false)"
          :ui="{
            base: 'p-0 pr-1.5',
          }"
          @click="
            useUpdateFilterSelectMenu(item, false, props.dataType);
            fetchFilteredItems();
          "
        />
      </template>
    </USelectMenu>
  </div>
</template>

<style lang="scss">

</style>
