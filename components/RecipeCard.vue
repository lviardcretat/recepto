
<script setup lang="ts">
import { Prisma } from '@prisma/client';

export type RecipeWithIngredients = Prisma.RecipeGetPayload<{
	include: { ingredients: true };
}>;

const props = defineProps<{
	name: RecipeWithIngredients['name'];
	preparationTime: RecipeWithIngredients['preparationTime'];
	description: RecipeWithIngredients['description'];
}>();
</script>

<template>
    <div class="recipe-card-content">
        <h1 class="name">{{ props.name }}</h1>
        <img src="~/assets/img/lasagnes.jpg" />
        <div class="data">
            <p>{{ props.preparationTime }}</p>
            <p>{{ props.description }}</p>
        </div>
        <button type="button">X</button>
    </div>
</template>

<style lang="scss">
    .recipe-card-content {
        width: 100%;
        height: 100%;
        background-color: antiquewhite;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        img {
            height: 20%;
            width: 100%;
            background-size: contain;
        }
    }
</style>
