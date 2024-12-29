<script setup lang="ts">
import type { Recipes } from '~/global/types';

const route = useRoute();
const recipeIndex = computed(() => {
    return Number(route.query.recipeIndex);
});

const store = useFiltersStore();

await store.fetchFilteredRecipes(0);
</script>

<template>
    <div class="alternative-recipes-selection-content">
        <swiper-container :slides-per-view="'auto'" :loop="false" :effect="'coverflow'" :grabcursor="true" :centered-slides="true"
			:coverflow-effect-rotate="0" :coverflow-effect-stretch="0" :coverflow-effect-depth="150" :coverflow-effect-modifier="2.5"
			:coverflow-effect-slide-shadows="false" :mousewheel="true" :initial-slide="recipeIndex">
            <swiper-slide v-for="recipe in (store.recipeCategoryList as unknown as Recipes[])[0]?.recipes">
				 <RecipeCard
					:name="recipe.name"
					:description="recipe.description"
					:peopleNumber="recipe.peopleNumber ?? 1"
					:preparationTime="recipe.preparationTime ?? 0"
					:cookingTime="recipe.cookingTime ?? 0"
					:restTime="recipe.restTime ?? 0"
					:createdAt="new Date(recipe.createdAt ?? '')"
					:fullName="`${recipe.createdBy?.firstname} ${recipe.createdBy?.lastname}`"/>
			</swiper-slide>
        </swiper-container>
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
