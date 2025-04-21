<script setup lang="ts">
import type { RecipeWithLessData } from '~/global/types/filter';

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
        <swiper-container :slides-per-view="'auto'" :loop="false" :effect="'coverflow'" :grabcursor="true" :centered-slides="true"
			:coverflow-effect-rotate="0" :coverflow-effect-stretch="0" :coverflow-effect-depth="150" :coverflow-effect-modifier="2.5"
			:coverflow-effect-slide-shadows="false" :mousewheel="true":grabCursor="true">
            <swiper-slide v-for="recipe in resultsStates.recipes">
				<RecipeCard
					:name="recipe.name"
					:description="recipe.description"
					:peopleNumber="recipe.peopleNumber ?? 1"
					:preparationTime="recipe.preparationTime ?? 0"
					:cookingTime="recipe.cookingTime ?? 0"
					:restTime="recipe.restTime ?? 0"
					:createdAt="new Date(recipe.createdAt)"
					fullName="dzqdzqdzqqzd"
					@click="recipeActive = recipe; isModalOpen = true"/>
			</swiper-slide>
        </swiper-container>
		<UModal v-model:open="isModalOpen" class="max-w-4xl">
			<template #body>
				<RecipeCardDetails :recipeId="recipeActive?.id ?? 1"/>
		    </template>
		</UModal>
    </div>
</template>

<style lang="scss">
    .alternative-recipes-selection-content {
        height: 100vh;
        width: 70vw;
        display: flex;
        flex-direction: column;
        justify-content: center;

        swiper-container {
            width: 100%;
            height: 80%;

            swiper-slide {
                width: 40%;
                height: 100%;
            }
        }
    }
</style>
