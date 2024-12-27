
<script setup lang="ts">
import type { RecipeWithIngredients } from '~/global/types';

const props = defineProps<{
	name: RecipeWithIngredients['name'];
	preparationTime: RecipeWithIngredients['preparationTime'];
	description: RecipeWithIngredients['description'];
}>();
</script>

<template>
	<UCard class="recipeCard flex flex-col" :ui="{body: { base: 'grow-2', }}">
		<template #header>
			<h1 class="name text-3xl text-center mb-6 mt-6">{{ props.name }}</h1>
			<img src="~/assets/img/lasagnes.jpg" />
		</template>


        <div class="data">
			<div class="icons flex justify-around items-center">
				<div class="peopleNumber flex justify-around items-center gap-1">
					<UIcon name="ic:baseline-people-alt"/>
					<span class="value">10</span>
				</div>
				<div class="cookingTime flex justify-around items-center gap-1">
					<UIcon name="material-symbols:oven-outline-rounded"/>
					<span class="value">2h</span>
				</div>
				<div class="preparationTime flex justify-around items-center gap-1">
					<UIcon name="mdi:knife"/>
					<span class="value">1h</span>
				</div>
				<div class="restTime flex justify-around items-center gap-1">
					<UIcon name="mdi:sleep"/>
					<span class="value">30m</span>
				</div>
			</div>
            <p class="mt-3 ellipsis h-20">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>

		<template #footer>
			<div class="footer flex justify-between items-center">
				<p>Créé par Loïc Viard-crétat</p>
				<p>12/02/2014</p>
			</div>
		</template>
	</UCard>
</template>

<style lang="scss">
.recipeCard {
	height: 95%;
	margin-top: 2.5%;

	.ellipsis {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		height: auto;
	}
}
</style>
