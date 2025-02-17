<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters';
import type { RecipesCategoriesWithLessData } from '~/global/types';

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
	<NuxtLink v-if="isData()" v-for="recipeCategory in store.recipeCategoryList as unknown as RecipesCategoriesWithLessData[]" :key="recipeCategory.id" :to="{ name: 'recipes-id', params: { id: recipeCategory.id }, query: { recipeIndex: 0}}">
		<UDashboardCard class="mb-4" :title="recipeCategory?.name"></UDashboardCard>
	</NuxtLink>
</template>

<style lang="scss">
	.recipe-content {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
</style>
