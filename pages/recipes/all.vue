<script setup lang="ts">
import type { RecipesCategoriesWithLessData } from '~/types/filter';

const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();

await callOnce(async () => {
	resultsStates.value.recipesCategories = (await useFetchFilteredItems(
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
	resultsStates.value.recipesCategories = (await useFetchFilteredItems(
		selectMenuStates.value,
		iconsGridStates.value,
		switchStates.value,
	)) as RecipesCategoriesWithLessData[];
});
</script>

<template>
	<UPageCard v-if="isData()" v-for="recipeCategory in resultsStates.recipesCategories"
		:title="recipeCategory?.name" variant="outline" target="_self"
		:to="{ name: 'recipes-id', params: { id: recipeCategory.id }, query: { recipeIndex: 0}}"></UPageCard>
</template>

<style lang="scss">
</style>
