<script setup lang="ts">
import { useFiltersStore } from '@/stores/filters';

const { data: recipeCategories } = await useFetch('/api/recipesCategories/all');
const test = useTest();
const store = useFiltersStore();
const { getustensilsIdWanted } = storeToRefs(store);

// Création d'un computed pour le filtrage
const filteredRecipeCategories = computed(() => {
	if (store.isNoFiltering) {
		return recipeCategories.value;
	}
	return recipeCategories.value?.filter((recipeCategory) =>
		recipeCategory.recipes.some((recipe) =>
			recipe.ustensils.some((ustensil) =>
				getustensilsIdWanted.value.includes(ustensil.id),
			),
		),
	);
});
</script>

<template>
	<UDashboardPage class="h-full">
		<MainSlideover></MainSlideover>
		<RecipeFilter/>
		<UDashboardPanel grow>
			<UDashboardNavbar title="Recettes">
				<template #right>
					<UColorModeToggle />
					<UButton
						:padded="false"
						variant="link"
						icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
						@click="test = !test"/>
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent>
				<NuxtLink v-for="recipeCategory in filteredRecipeCategories" :key="recipeCategory.id" :to="{ name: 'recipes-id', params: { id: recipeCategory.id }}">
					<UDashboardCard :title="recipeCategory.name">
					</UDashboardCard>
				</NuxtLink>
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>

<style lang="scss">
	.recipe-content {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
</style>
