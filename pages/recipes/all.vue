<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters';
import type { RecipesCategories } from '~/server/data/recipesCategories';

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
</script>

<template>
	<NuxtLink v-if="isData()" v-for="recipeCategory in store.recipeCategoryList as unknown as RecipesCategories[]" :key="recipeCategory.id" :to="{ name: 'recipes-id', params: { id: recipeCategory.id }}">
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
