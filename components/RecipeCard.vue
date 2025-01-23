
<script setup lang="ts">
import type { RecipeWithIngredients } from '~/global/types';
import { formatDuration } from '~/global/utils';

const props = defineProps<{
	name: RecipeWithIngredients['name'];
	description: RecipeWithIngredients['description'];
	peopleNumber: RecipeWithIngredients['peopleNumber'];
	preparationTime: RecipeWithIngredients['preparationTime'];
	cookingTime: RecipeWithIngredients['cookingTime'];
	restTime: RecipeWithIngredients['restTime'];
	createdAt: RecipeWithIngredients['createdAt'];
	fullName: string;
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
					<span class="value">{{ props.peopleNumber }}</span>
				</div>
				<div class="preparationTime flex justify-around items-center gap-1">
					<UIcon name="mdi:knife"/>
					<span class="value">{{ formatDuration(props.preparationTime)}}</span>
				</div>
				<div class="cookingTime flex justify-around items-center gap-1">
					<UIcon name="material-symbols:oven-outline-rounded"/>
					<span class="value">{{ formatDuration(props.cookingTime) }}</span>
				</div>
				<div class="restTime flex justify-around items-center gap-1">
					<UIcon name="mdi:sleep"/>
					<span class="value">{{ formatDuration(props.restTime) }}</span>
				</div>
			</div>
            <p class="mt-3 ellipsis h-20">{{ props.description }}</p>
        </div>

		<template #footer>
			<div class="footer flex justify-between items-center">
				<p>{{ $t('createdBy', { username: props.fullName })}}</p>
				<p>{{ $d(props.createdAt, 'short') }}</p>
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
