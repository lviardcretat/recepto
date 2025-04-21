<script lang="ts" setup>
import type { FilterIconsGridStatesType } from '~/global/enums/filter';
import type { RecipeWithLessData } from '~/global/types/filter';

defineProps<{ dataType: FilterIconsGridStatesType }>();

const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();
const route = useRoute();

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
	<div class="grid grid-cols-3 grid-rows-2 gap-2 justify-items-center">
		<UTooltip v-for="item in iconsGridStates[dataType]" :text="item.label" :delay-duration="0" :content="{ side: 'top' }"
			class="w-6 h-6 ml-4 mr-4 mt-2 mb-2 flex items-center justify-center">
			<UButton
				:icon="item.icon"
				color="neutral"
				variant="ghost"
				:class="item.active ? 'opacity-100' : 'opacity-20'"
				@click="
					item.active = !item.active;
					useUpdateFilterIconsGrid(item.id, item.active, item.dataType);
					fetchFilteredItems();
				"/>
		</UTooltip>
	</div>
</template>

<style lang="scss" scoped>

</style>
