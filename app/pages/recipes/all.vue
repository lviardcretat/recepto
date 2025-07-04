<script setup lang="ts">
import type { RecipesCategoriesWithLessData } from '~/types/filter';

const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();

await callOnce(async () => {
	resultsStates.value.recipesCategories = (await FilterUtils.fetchFilteredItems(
		selectMenuStates.value,
		iconsGridStates.value,
		switchStates.value,
	)) as RecipesCategoriesWithLessData[];
});

function isData() {
	return (
		resultsStates.value.recipesCategories !== undefined &&
		resultsStates.value.recipesCategories !== null &&
		resultsStates.value.recipesCategories.length > 0
	);
}

useListen('recipesCategory:created', async () => {
	resultsStates.value.recipesCategories = (await FilterUtils.fetchFilteredItems(
		selectMenuStates.value,
		iconsGridStates.value,
		switchStates.value,
	)) as RecipesCategoriesWithLessData[];
});
</script>

<template>
	<UPageList divide>
		<UPageCard v-if="isData()" v-for="(recipeCategory, index) in resultsStates.recipesCategories"
			:key="index" variant="ghost" target="_self"
			:to="{ name: 'recipes-id', params: { id: recipeCategory.id }, query: { recipeIndex: 0}}">
			<div class="flex justify-between gap-8 items-center">
				<div class="flex justify-between grow items-center">
					<div>{{ recipeCategory.name }}</div>
					<div>{{ `${recipeCategory.count} ${$t('recipe', 2)}` }}</div>
				</div>
				<UIcon name="material-symbols:arrow-forward-ios" class="size-5" />
			</div>
		</UPageCard>
	</UPageList>
</template>

<style lang="scss">
</style>
