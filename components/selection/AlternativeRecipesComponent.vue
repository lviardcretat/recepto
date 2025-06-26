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
    <div class="alternative-recipes-selection-content m-auto p-36 w-full overflow-hidden">
		<UCarousel v-slot="{ item }" :items="resultsStates.recipes" class-names
    		:ui="{
				item: 'basis-[70%] transition-transform [&:not(.is-snapped)]:scale-90',
				container: 'align-middle'
			}">
			<SelectionRecipeCardComponent
					:name="item.name"
					:description="item.description"
					:peopleNumber="item.peopleNumber ?? 1"
					:preparationTime="item.preparationTime ?? 0"
					:cookingTime="item.cookingTime ?? 0"
					:restTime="item.restTime ?? 0"
					:createdAt="new Date(item.createdAt)"
					fullName="dzqdzqdzqqzd"
					@click="recipeActive = item; isModalOpen = true"/>
		</UCarousel>

		<UModal v-model:open="isModalOpen" class="max-w-4xl">
			<template #body>
				<SelectionRecipeCardDetailsComponent :recipeId="recipeActive?.id ?? 1"/>
		    </template>
		</UModal>
    </div>
</template>

<style lang="scss">
</style>
