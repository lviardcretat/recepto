<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui';
import {
	FilterResultStatesType,
	type FilterSelectMenuStatesType,
} from '~/global/enums/filter';
import type {
	CustomSelectMenuItem,
	RecipesCategoriesWithLessData,
	RecipeWithLessData,
} from '~/global/types/filter';

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
	const result = await useFetchFilteredItems(
		selectMenuStates.value,
		iconsGridStates.value,
		switchStates.value,
		route.params.id ?? null,
	);
	if (route.params.id) {
		resultsStates.value.recipes = result as RecipeWithLessData[];
	}
	resultsStates.value.recipesCategories = result;
}
</script>

<template>
  	<div>
		<div class="mb-2 flex flex-wrap h-auto">
			<!-- @vue-ignore -->
			<UBadge v-for="item of selectedItemsStates[dataType]" class="h-6 m-0.5"
				:color="item.wanted ? 'primary' : 'error'" size="md" variant="solid" :label="item.label"></UBadge>
		</div>
		<USelectMenu
			:disabled="disabled"
			v-model="selectedItemsStates[dataType]"
			:v-model:open="disabled"
			:items="selectMenuStates[dataType]"
			class="w-full"
			multiple
			:placeholder="$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })"
			searchable
			:searchable-placeholder="$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })"
			:ui="{ itemTrailing: 'hidden' }">
			<template #default>
				<span v-if="selectMenuStates[dataType].length">{{
					$t('selected', selectMenuStates[dataType].filter(item => item.notWanted || item.wanted).length, { count: selectMenuStates[dataType].filter(item => item.notWanted || item.wanted).length })
				}}</span>
     			<span v-else>{{$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })}}</span>
			</template>
			<template #item-leading="{ item }">
				<UButton
					:padded="false" variant="link" icon="material-symbols:circle-outline"
					:class="getButtonsColor(item, true)" @click="
						useUpdateFilterSelectMenu(item.id, true, item.dataType);
						fetchFilteredItems();
					"
					:ui="{
						base: 'p-0'
					}"/>
				<UButton
					:padded="false" variant="link" icon="radix-icons:value-none"
					:class="getButtonsColor(item, false)" @click="
						useUpdateFilterSelectMenu(item.id, false, item.dataType);
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
