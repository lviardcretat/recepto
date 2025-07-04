<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui';
import { type FilterSelectMenuStatesType } from '~/enums/filter';
import type {
	CustomSelectMenuItem,
	RecipesCategoriesWithLessData,
	RecipeWithLessData,
} from '~/types/filter';

const props = defineProps<{
	placeholder: string;
	disabled: boolean;
	dataType: FilterSelectMenuStatesType;
}>();
const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();
const selectedItemsStates = useFilterSelectedItemsStates();
const route = useRoute();
const itemsSelectedNumber = ref<number>(
	selectMenuStates.value[props.dataType].filter(
		(item) => item.notWanted || item.wanted,
	).length,
);

function getButtonsColor(
	selectMenuItem: SelectMenuItem & CustomSelectMenuItem,
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
		resultsStates.value.recipes = result as RecipeWithLessData[];
	}
	resultsStates.value.recipesCategories =
		result.filter<RecipesCategoriesWithLessData>(
			TypeGuardUtils.isRecipesCategoriesWithLessData,
		);
}
</script>

<template>
  	<div>
		<div class="mb-2 flex flex-wrap h-auto">
			<!-- @vue-ignore -->
			<UBadge v-for="item of selectedItemsStates[props.dataType]" class="h-6 m-0.5"
				:color="item.wanted ? 'primary' : 'error'" size="md" variant="solid" :label="item.label"></UBadge>
		</div>
		<USelectMenu
			:disabled="props.disabled"
			:v-model:open="props.disabled"
			:items="selectMenuStates[props.dataType]"
			class="w-full"
			multiple
			:placeholder="$t('filterBy', { filterName: props.placeholder.toLocaleLowerCase() })"
			searchable
			:searchable-placeholder="$t('filterBy', { filterName: props.placeholder.toLocaleLowerCase() })"
			:ui="{ itemTrailing: 'hidden' }">
			<template #default>
				<span v-if="selectMenuStates[props.dataType].length">{{
					$t('selected', { count: itemsSelectedNumber }, itemsSelectedNumber)
				}}</span>
     			<span v-else>{{$t('filterBy', { filterName: props.placeholder.toLocaleLowerCase() })}}</span>
			</template>
			<template #item-leading="{ item }">
				<UButton
					:padded="false" variant="link" icon="material-symbols:circle-outline"
					:class="getButtonsColor(item, true)" @click="
						useUpdateFilterSelectMenu(item.id, true, props.dataType);
						useUpdateFilterSelectedMenu(item, true, props.dataType)
						fetchFilteredItems();
					"
					:ui="{
						base: 'p-0'
					}"/>
				<UButton
					:padded="false" variant="link" icon="radix-icons:value-none"
					:class="getButtonsColor(item, false)" @click="
						useUpdateFilterSelectMenu(item.id, false, props.dataType);
						useUpdateFilterSelectedMenu(item, false, props.dataType)
						fetchFilteredItems();
					"
					:ui="{
						base: 'p-0 pr-1.5'
					}"/>
			</template>
		</USelectMenu>
  	</div>
</template>

<style lang="scss">

</style>
