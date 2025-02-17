<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
	recipeCreation,
	type RecipeCreation,
} from '~/global/validationSchemas';

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
	sequences?: { title?: string; description?: string }[];
	ingredients?: { ingredientId?: number; quantity?: number; unitId?: number }[];
	ustensils?: number[];
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
	ingredients: [
		{ ingredientId: undefined, quantity: undefined, unitId: undefined },
	],
	sequences: [{ title: undefined, description: undefined }],
	allergens: [],
	ustensils: [],
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
		<UFormGroup :label="$t('formCreation.name')" name="name" eager-validation>
			<UInput v-model="state.name" type="text" :placeholder="$t('formCreation.recipe.nameExample')" />
		</UFormGroup>
		<UFormGroup :label="$t('formCreation.recipe.description')" name="description" eager-validation>
			<UTextarea v-model="state.description" :placeholder="$t('formCreation.recipe.descriptionExample')"/>
		</UFormGroup>
		<UFormGroup :label="$t('formCreation.recipe.tips')" name="tips" :hint="$t('formCreation.recipe.optional')" eager-validation>
			<UInput v-model="state.tips" type="text" :placeholder="$t('formCreation.recipe.tipsExample')"/>
		</UFormGroup>
		<div class="flex gap-2">
			<UFormGroup :label="$t('formCreation.recipe.peopleNumber')" name="peopleNumber" class="w-full" eager-validation>
				<UInput v-model="state.peopleNumber" type="number" placeholder="4"/>
			</UFormGroup>
			<UFormGroup :label="$t('formCreation.recipe.preparationTime')" name="preparationTime" class="w-full" hint="(en heures)" eager-validation>
				<UInput v-model="state.preparationTime" type="number" placeholder="0.25"/>
			</UFormGroup>
			<UFormGroup :label="$t('formCreation.recipe.cookingTime')" name="cookingTime" class="w-full" hint="(en heures)" eager-validation>
				<UInput v-model="state.cookingTime" type="number" placeholder="2"/>
			</UFormGroup>
			<UFormGroup :label="$t('formCreation.recipe.restTime')" name="restTime" class="w-full" hint="(en heures)" eager-validation>
				<UInput v-model="state.restTime" type="number" placeholder="0"/>
			</UFormGroup>
		</div>
		<UDivider/>
		<UFormGroup :label="$t('ingredient')" name="ingredients" class="flex flex-col gap-4" size="xl">
			<template #hint>
				<UButton @click="state.ingredients?.push({ ingredientId: undefined, quantity: undefined, unitId: undefined })"
					icon="material-symbols:add" variant="ghost">{{ $t('add') }}</UButton>
			</template>
			<div class="flex flex-col gap-4 w-full">
				<div class="flex gap-2" v-for="(ingredient, index) of state.ingredients">
					<UFormGroup :label="$t('name')" :name="`ingredients.${index}.ingredientId`" class="w-full">
						<USelectMenu v-model="ingredient.ingredientId" :options="ingredients ?? []"
							:searchable-placeholder="$t('search')"
							:placeholder="$t('formCreation.recipe.selectBy_male', { selectName: $t('ingredient').toLowerCase() })"
							option-attribute="name" value-attribute="id" searchable/>
					</UFormGroup>
					<UFormGroup :label="$t('formCreation.recipe.quantity')" :name="`ingredients.${index}.quantity`" class="w-full" eager-validation>
						<UInput v-model="ingredient.quantity" type="number" placeholder="2.6"/>
					</UFormGroup>
					<UFormGroup :label="$t('formCreation.recipe.unit')" :name="`ingredients.${index}.unitId`" class="w-full">
						<USelectMenu v-model="ingredient.unitId" :options="units ?? []"
							:searchable-placeholder="$t('search')"
						:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.unit').toLowerCase() })"
							option-attribute="name" value-attribute="id" searchable/>
					</UFormGroup>
					<UButton :disabled="!((state.ingredients?.length ?? 0) > 1 && index > 0)" @click="state.ingredients?.splice(index, 1)"
						class="w-fit h-fit self-center"
						icon="material-symbols:remove" variant="ghost">{{ $t('delete') }}</UButton>
				</div>
			</div>
		</UFormGroup>
		<UDivider/>
		<UFormGroup :label="$t('formCreation.recipe.sequences')" name="sequences" class="flex flex-col gap-4" size="xl">
			<template #hint>
				<UButton @click="state.sequences?.push({ title: undefined, description: undefined })"
					icon="material-symbols:add" variant="ghost">{{ $t('add') }}</UButton>
			</template>
			<div class="flex flex-col gap-4 w-full">
				<div class="flex gap-4 w-full" v-for="(sequence, index) in state.sequences" :key="index">
					<UFormGroup :label="$t('formCreation.recipe.title')" :name="`sequences.${index}.title`" class="w-full" eager-validation>
						<UInput v-model="sequence.title" type="string" :placeholder="$t('formCreation.recipe.sequenceTitleExample')"/>
					</UFormGroup>
					<UFormGroup :label="$t('formCreation.recipe.description')" :name="`sequences.${index}.description`" class="w-full" eager-validation>
						<UInput v-model="sequence.description" type="string" :placeholder="$t('formCreation.recipe.sequenceDescriptionExample')"/>
					</UFormGroup>
					<UButton :disabled="!((state.sequences?.length ?? 0) > 1 && index > 0)" @click="state.sequences?.splice(index, 1)"
						class="w-fit h-fit self-center"
						icon="material-symbols:remove" variant="ghost">{{ $t('delete') }}</UButton>
				</div>
			</div>
		</UFormGroup>
		<UDivider/>
		<div class="flex gap-2">
			<UFormGroup :label="$t('ustensil', 2)" name="ustensils" class="w-full">
				<USelectMenu v-model="state.ustensils" :options="ustensils ?? []" multiple
					:searchable-placeholder="$t('search')"
					:placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('ustensil', 2).toLowerCase() })"
					option-attribute="name" value-attribute="id" searchable/>
			</UFormGroup>
			<UFormGroup :label="$t('category')" name="recipesCategoryId" class="w-full">
				<USelectMenu v-model="state.recipesCategoryId" :options="recipesCategories ?? []"
					:searchable-placeholder="$t('search')"
					:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.category').toLowerCase() })"
					option-attribute="name" value-attribute="id" searchable @update:modelValue="state.recipesCategoryId = Number($event)"/>
			</UFormGroup>
			<UFormGroup :label="$t('formCreation.recipe.season')" name="seasonId" class="w-full">
				<USelectMenu v-model="state.seasonId" :options="seasons ?? []"
					:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.season').toLowerCase() })"
					option-attribute="name" value-attribute="id" @update:modelValue="state.seasonId = Number($event)"/>
			</UFormGroup>
		</div>
		<UFormGroup :label="$t('allergens')" name="allergens" class="w-full" :hint="$t('formCreation.recipe.optional')">
			<USelectMenu v-model="state.allergens" :options="allergens ?? []" multiple
				:searchable-placeholder="$t('search')"
				:placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('allergens').toLowerCase() })"
				option-attribute="name" value-attribute="id" searchable/>
		</UFormGroup>
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

</style>
