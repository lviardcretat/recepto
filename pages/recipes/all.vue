<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters';

const test = useTest();
const store = useFiltersStore();

store.fetchFilteredRecipes();

definePageMeta({
	layout: 'filter',
});
</script>

<template>
	<NuxtLink v-for="recipeCategory in store.recipeCategoryList" :key="recipeCategory.id" :to="{ name: 'recipes-id', params: { id: recipeCategory.id }}">
		<UDashboardCard class="mb-4" :title="recipeCategory.name"></UDashboardCard>
	</NuxtLink>
</template>

<style lang="scss">
	.recipe-content {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
</style>
