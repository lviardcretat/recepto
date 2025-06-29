<script setup lang="ts">
import type { RecipeWithLessData } from '~/types/filter';

const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();
const switchStates = useFilterSwitchStates();
const resultsStates = useFilterResults();
const route = useRoute();

const isModalOpen: Ref<boolean> = ref(false);
const recipeActive: Ref<RecipeWithLessData | undefined> = ref();

useListen('recipe:created', async () => {});

await callOnce(
	async () => {
		resultsStates.value.recipes = (await useFetchFilteredItems(
			selectMenuStates.value,
			iconsGridStates.value,
			switchStates.value,
			route.params.id,
		)) as RecipeWithLessData[];
	},
	{ mode: 'navigation' },
);

useListen('recipe:created', async () => {
	resultsStates.value.recipes = (await useFetchFilteredItems(
		selectMenuStates.value,
		iconsGridStates.value,
		switchStates.value,
		route.params.id,
	)) as RecipeWithLessData[];
});
</script>

<template>
    <div class="alternative-recipes-selection-content">
		<UPageColumns>
			<SelectionRecipeCardComponent v-for="recipe in resultsStates.recipes"
					:name="recipe.name"
					:description="recipe.description"
					:peopleNumber="recipe.peopleNumber ?? 1"
					:preparationTime="recipe.preparationTime ?? 0"
					:cookingTime="recipe.cookingTime ?? 0"
					:restTime="recipe.restTime ?? 0"
					:createdAt="new Date(recipe.createdAt)"
					fullName="dzqdzqdzqqzd"
					@click="recipeActive = recipe; isModalOpen = true"/>
		</UPageColumns>

		<UModal v-model:open="isModalOpen" class="max-w-4xl">
			<template #body>
				<SelectionRecipeCardDetailsComponent :recipeId="recipeActive?.id ?? 1"/>
		    </template>
		</UModal>
    </div>
</template>

<style lang="scss">
</style>
