<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters';

const store = useFiltersStore();
await store.fetchFilteredRecipes();

definePageMeta({
	layout: 'filter',
});

function isData() {
	return (
		store.recipeCategoryList !== undefined &&
		store.recipeCategoryList !== null &&
		store.recipeCategoryList.length > 0
	);
}

useListen('recipesCategory:created', async () => {
	await store.fetchFilteredRecipes();
});
</script>

<template>
	<UPageCard v-if="isData()" v-for="recipeCategory in store.recipeCategoryList"
		:title="recipeCategory?.name" variant="outline" target="_self"
		:to="{ name: 'recipes-id', params: { id: recipeCategory.id }, query: { recipeIndex: 0}}"></UPageCard>
</template>

<style lang="scss">
</style>
