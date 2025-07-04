<script lang="ts" setup>
import type { RecipeDetail } from '~/types/recipeCard';

const props = defineProps<{
	recipeId: number;
}>();

const { data: recipeFetch } = await useFetch<RecipeDetail>(
	`/api/recipesCategories/recipes/${props.recipeId}`,
	{
		method: 'GET',
		watch: false,
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	},
);

const recipe = recipeFetch.value;
const ingredients = ref(
	recipe?.ingredients.map((ingredient) => ({
		name: ingredient.ingredient.name,
		quantity: ingredient.quantity,
		unit: ingredient.unit.shortForm,
		singlePortion: ingredient.quantity / (recipe.peopleNumber ?? 1),
	})),
);
const sequences = recipe?.sequences.map((sequence) => ({
	label: sequence.title,
	content: sequence.description,
}));
const peopleNumberModified = ref(recipe?.peopleNumber ?? 1);

function renderIngredient(): void {
	if (ingredients.value) {
		for (const [index] of ingredients.value.entries()) {
			if (ingredients.value[index]) {
				ingredients.value[index].quantity = Number(
					(
						ingredients.value[index].singlePortion * peopleNumberModified.value
					).toFixed(2),
				);
			}
		}
	}
}

// TODO : make it work
const active = ref(['0', '1']);
</script>

<template>
	<UCard class="w-full card">
		<template #header>
			<div class="layer"></div>
			<div class="text-center text-4xl m-4 font-bold text-green-500">{{ recipe?.name }}</div>
			<div class="icons flex justify-center items-center gap-4">
				<div class="peopleNumber flex justify-center items-center gap-1 w-20">
					<UIcon name="ic:baseline-people-alt"/>
					<UInputNumber :min="1" :max="50" size="md" v-model="peopleNumberModified" variant="none"
						orientation="vertical" class="w-15" @update:modelValue="renderIngredient()"/>
				</div>
				<div class="preparationTime flex justify-center items-center gap-1 w-20">
					<UIcon name="mdi:knife"/>
					<span class="value">{{ formatDurationUtils(recipe?.preparationTime)}}</span>
				</div>
				<div class="cookingTime flex justify-center items-center gap-1 w-20">
					<UIcon name="material-symbols:oven-outline-rounded"/>
					<span class="value">{{ formatDurationUtils(recipe?.cookingTime) }}</span>
				</div>
				<div class="restTime flex justify-center items-center gap-1 w-20">
					<UIcon name="mdi:sleep"/>
					<span class="value">{{ formatDurationUtils(recipe?.restTime) }}</span>
				</div>
			</div>
			<div class="text-center mt-2">
				<UTooltip v-if="recipe?.allergens?.length ?? 0 > 0" :text="allergen.allergen.name" v-for="allergen in recipe?.allergens">
					<UIcon name="vscode-icons:default-file" />
				</UTooltip>
				<div v-else>{{ $t('allergenFree') }}</div>
			</div>
		</template>
		<UContainer class="info mb-6">
			<div>{{ recipe?.description }}</div>
			<div class="mt-4 italic text-center">{{ `❝ ${recipe?.tips} ❞` }}</div>
		</UContainer>
		<USeparator/>
		<UContainer class="base flex pb-6 pt-6">
			<div class="ingredientsUstensils w-1/4">
				<h1 class="text-3xl mb-4 font-semibold text-green-500">{{ $t('ingredient', 2) }}</h1>
				<div class="flex flex-col">
					<div v-for="ingredient in ingredients">
						<span class="font-bold">{{ `${ingredient.quantity}${ingredient.unit} ` }}</span>
						<span>{{ ingredient.name }}</span>
					</div>
				</div>
				<USeparator class="pb-6 pt-6"/>
				<h1 class="text-3xl mb-4 font-semibold text-green-500">{{ $t('ustensil', 2) }}</h1>
				<div class="flex flex-col">
					<div v-for="ustensil in recipe?.ustensils">{{ ustensil.ustensil.name }}</div>
				</div>
			</div>
			<USeparator class="mr-6 ml-6" orientation="vertical" />
			<div class="sequences w-3/4 flex flex-col">
				<h1 class="text-3xl mb-4 font-semibold text-green-500">{{ $t('preparationSteps') }}</h1>
				<UAccordion type="multiple" :items="sequences" :v-model="active">
					<template #leading="{ index }">
						<span class="truncate">{{ index + 1 }}.</span>
					</template>
				</UAccordion>
			</div>
		</UContainer>
		<template #footer>
			<div class="footer flex justify-between items-center">
				<p>{{ $t('createdBy', { username: recipe?.name })}}</p>
				<p>{{ $d(new Date(recipe?.createdAt ?? ''), 'short') }}</p>
			</div>
		</template>
	</UCard>
</template>

<style lang="scss" scoped>
	.card {
		--tw-ring-color: transparent;
	}

	.layer {
		aspect-ratio: 3 / 1;
		background:
			linear-gradient(180deg, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 20%, rgba(17,24,39,0) 50%, rgba(17,24,39,0) 80%, rgba(17,24,39,1) 100%),
			linear-gradient(90deg, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 20%, rgba(17,24,39,0) 50%, rgba(17,24,39,0) 80%, rgba(17,24,39,1) 100%),
			url('../assets/img/lasagnes.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
