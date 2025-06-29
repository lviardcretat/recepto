<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
	recipeCreation,
	type RecipeCreation,
	type RecipeIngredientsCreation,
	type RecipeSequenceCreation,
} from '~/schemas/creation/recipe';

const emit = defineEmits(['closeModal']);
const toast = useToast();
const form = ref();
const state = ref<{
	name?: string;
	description?: string;
	tips?: string;
	peopleNumber?: number;
	preparationTime?: number;
	cookingTime?: number;
	restTime?: number;
	seasonId?: number;
	allergens?: number[];
	sequences: RecipeSequenceCreation;
	ingredients: RecipeIngredientsCreation;
	ustensils?: [number, ...number[]];
	recipesCategoryId?: number;
}>({
	name: undefined,
	description: undefined,
	tips: undefined,
	peopleNumber: undefined,
	preparationTime: undefined,
	cookingTime: undefined,
	restTime: undefined,
	seasonId: undefined,
	ingredients: [{ ingredientId: 0, quantity: 0, unitId: 0 }],
	sequences: [{ title: '', description: '' }],
	allergens: [],
	ustensils: [0],
	recipesCategoryId: undefined,
});

const { data: seasons } = await useFetch('/api/seasons/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
	transform: (seasons) => {
		return mapSelectMenuItemsUtils(seasons);
	},
});

const { data: recipesCategories } = await useFetch(
	'/api/recipesCategories/all',
	{
		method: 'GET',
		watch: false,
		default: () => null,
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
		transform: (recipesCategories) => {
			return mapSelectMenuItemsUtils(recipesCategories);
		},
	},
);

const { data: ingredients } = await useFetch('/api/ingredients/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
	transform: (ingredients) => {
		return mapSelectMenuItemsUtils(ingredients);
	},
});

const { data: allergens } = await useFetch('/api/allergens/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
	transform: (allergens) => {
		return mapSelectMenuItemsUtils(allergens);
	},
});

const { data: ustensils } = await useFetch('/api/ustensils/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
	transform: (ustensils) => {
		return mapSelectMenuItemsUtils(ustensils);
	},
});

const { data: units } = await useFetch('/api/units/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
	transform: (units) => {
		return mapSelectMenuItemsUtils(units);
	},
});

async function onSubmit(event: FormSubmitEvent<RecipeCreation>) {
	await $fetch('/api/recipesCategories/recipes', {
		method: 'POST',
		body: event.data,
		immediate: false,
		watch: false,
		onResponse() {
			useEvent('recipe:created', true);
			emit('closeModal');
			toast.add({
				title: `La recette ${event.data.name} a bien été ajouté !`,
			});
		},
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response._data.message,
			});
		},
	});
}
</script>

<template>
	<UForm ref="form" :schema="recipeCreation" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormField :label="$t('formCreation.name')" name="name" eager-validation :ui="{container: 'w-container',}">
			<UInput v-model="state.name" type="text" :placeholder="$t('formCreation.recipe.nameExample')" />
		</UFormField>
		<UFormField :label="$t('formCreation.recipe.description')" name="description" eager-validation :ui="{container: 'w-container',}">
			<UTextarea v-model="state.description" :placeholder="$t('formCreation.recipe.descriptionExample')"/>
		</UFormField>
		<UFormField :label="$t('formCreation.recipe.tips')" name="tips" :hint="$t('formCreation.recipe.optional')" eager-validation :ui="{container: 'w-container',}">
			<UInput v-model="state.tips" type="text" :placeholder="$t('formCreation.recipe.tipsExample')"/>
		</UFormField>
		<div class="flex gap-2">
			<UFormField :label="$t('formCreation.recipe.peopleNumber')" name="peopleNumber" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
				<UInput v-model="state.peopleNumber" type="number" placeholder="4"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.preparationTime')" name="preparationTime" hint="(en heures)" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
				<UInput v-model="state.preparationTime" type="number" placeholder="0.25"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.cookingTime')" name="cookingTime" hint="(en heures)" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
				<UInput v-model="state.cookingTime" type="number" placeholder="2"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.restTime')" name="restTime" hint="(en heures)" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
				<UInput v-model="state.restTime" type="number" placeholder="0"/>
			</UFormField>
		</div>
		<USeparator/>
		<UFormField :label="$t('ingredient')" name="ingredients" class="flex flex-col gap-4" size="xl">
			<template #hint>
				<UButton @click="state.ingredients?.push({ ingredientId: 0, quantity: 0, unitId: 0 })"
					icon="material-symbols:add" variant="ghost">{{ $t('add') }}</UButton>
			</template>
			<div class="flex flex-col gap-4 w-full">
				<div class="flex gap-2" v-for="(ingredient, index) of state.ingredients">
					<UFormField :label="$t('name')" :name="`ingredients.${index}.ingredientId`" :ui="{root: 'w-root', container: 'w-container'}">
						<USelectMenu v-model="ingredient.ingredientId" value-key="id" :items="ingredients ?? []"
							:searchable-placeholder="$t('search')" class="w-full"
							:placeholder="$t('formCreation.recipe.selectBy_male', { selectName: $t('ingredient').toLowerCase() })"
							searchable/>
					</UFormField>
					<UFormField :label="$t('formCreation.recipe.quantity')" :name="`ingredients.${index}.quantity`" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
						<UInput v-model="ingredient.quantity" type="number" placeholder="2.6"/>
					</UFormField>
					<UFormField :label="$t('formCreation.recipe.unit')" :name="`ingredients.${index}.unitId`" :ui="{root: 'w-root', container: 'w-container'}">
						<USelectMenu v-model="ingredient.unitId" value-key="id" :items="units ?? []"
							:searchable-placeholder="$t('search')" class="w-full"
							:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.unit').toLowerCase() })"
							searchable/>
					</UFormField>
					<UButton :disabled="!((state.ingredients?.length ?? 0) > 1 && index > 0)" @click="state.ingredients?.splice(index, 1)"
						class="w-fit h-fit self-center"
						icon="material-symbols:remove" variant="ghost">{{ $t('delete') }}</UButton>
				</div>
			</div>
		</UFormField>
		<USeparator/>
		<UFormField :label="$t('formCreation.recipe.sequences')" name="sequences" class="flex flex-col gap-4" size="xl">
			<template #hint>
				<UButton @click="state.sequences?.push({ title: '', description: '' })"
					icon="material-symbols:add" variant="ghost">{{ $t('add') }}</UButton>
			</template>
			<div class="flex flex-col gap-4 w-full">
				<div class="flex gap-4 w-full" v-for="(sequence, index) in state.sequences" :key="index">
					<UFormField :label="$t('formCreation.recipe.title')" :name="`sequences.${index}.title`" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
						<UInput v-model="sequence.title" type="string" :placeholder="$t('formCreation.recipe.sequenceTitleExample')"/>
					</UFormField>
					<UFormField :label="$t('formCreation.recipe.description')" :name="`sequences.${index}.description`" eager-validation :ui="{root: 'w-root', container: 'w-container'}">
						<UInput v-model="sequence.description" type="string" :placeholder="$t('formCreation.recipe.sequenceDescriptionExample')"/>
					</UFormField>
					<UButton :disabled="!((state.sequences?.length ?? 0) > 1 && index > 0)" @click="state.sequences?.splice(index, 1)"
						class="w-fit h-fit self-center"
						icon="material-symbols:remove" variant="ghost">{{ $t('delete') }}</UButton>
				</div>
			</div>
		</UFormField>
		<USeparator/>
		<div class="flex gap-2">
			<UFormField :label="$t('ustensil', 2)" name="ustensils" :ui="{root: 'w-root',container: 'w-container'}">
				<USelectMenu v-model="state.ustensils" value-key="id" :items="ustensils ?? []" multiple
					:searchable-placeholder="$t('search')" class="w-full"
					:placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('ustensil', 2).toLowerCase() })"
					searchable/>
			</UFormField>
			<UFormField :label="$t('category')" name="recipesCategoryId" :ui="{root: 'w-root',container: 'w-container'}">
				<USelectMenu v-model="state.recipesCategoryId" value-key="id" :items="recipesCategories ?? []"
					:searchable-placeholder="$t('search')" class="w-full"
					:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.category').toLowerCase() })"
					searchable @update:modelValue="state.recipesCategoryId = Number($event)"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.season')" name="seasonId" :ui="{root: 'w-root',container: 'w-container'}">
				<USelectMenu v-model="state.seasonId" value-key="id" :items="seasons ?? []"
					:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.season').toLowerCase() })"
					@update:modelValue="state.seasonId = Number($event)" class="w-full"/>
			</UFormField>
		</div>
		<UFormField :label="$t('allergens')" name="allergens" :hint="$t('formCreation.recipe.optional')">
			<USelectMenu v-model="state.allergens"  value-key="id" :items="allergens as any ?? []" multiple
				:searchable-placeholder="$t('search')" class="w-full"
				:placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('allergens').toLowerCase() })"
				searchable/>
		</UFormField>
		<div class="flex justify-between">
			<UButton variant="outline" @click="form.clear()">
				{{ $t('formCreation.clear') }}
			</UButton>
			<UButton type="submit">
				{{ $t('formCreation.submit') }}
			</UButton>
		</div>
	</UForm>
</template>

<style lang="scss" scoped>
	.w-container div {
		width: 100%;
	}

	.w-root {
		width: 100%;
	}
</style>
