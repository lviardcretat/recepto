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
		<UFormField :label="$t('formCreation.name')" name="name" eager-validation>
			<UInput v-model="state.name" type="text" :placeholder="$t('formCreation.recipe.nameExample')" />
		</UFormField>
		<UFormField :label="$t('formCreation.recipe.description')" name="description" eager-validation>
			<UTextarea v-model="state.description" :placeholder="$t('formCreation.recipe.descriptionExample')"/>
		</UFormField>
		<UFormField :label="$t('formCreation.recipe.tips')" name="tips" :hint="$t('formCreation.recipe.optional')" eager-validation>
			<UInput v-model="state.tips" type="text" :placeholder="$t('formCreation.recipe.tipsExample')"/>
		</UFormField>
		<div class="flex gap-2">
			<UFormField :label="$t('formCreation.recipe.peopleNumber')" name="peopleNumber" class="w-full" eager-validation>
				<UInput v-model="state.peopleNumber" type="number" placeholder="4"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.preparationTime')" name="preparationTime" class="w-full" hint="(en heures)" eager-validation>
				<UInput v-model="state.preparationTime" type="number" placeholder="0.25"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.cookingTime')" name="cookingTime" class="w-full" hint="(en heures)" eager-validation>
				<UInput v-model="state.cookingTime" type="number" placeholder="2"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.restTime')" name="restTime" class="w-full" hint="(en heures)" eager-validation>
				<UInput v-model="state.restTime" type="number" placeholder="0"/>
			</UFormField>
		</div>
		<USeparator/>
		<UFormField :label="$t('ingredient')" name="ingredients" class="flex flex-col gap-4" size="xl">
			<template #hint>
				<UButton @click="state.ingredients?.push({ ingredientId: undefined, quantity: undefined, unitId: undefined })"
					icon="material-symbols:add" variant="ghost">{{ $t('add') }}</UButton>
			</template>
			<div class="flex flex-col gap-4 w-full">
				<div class="flex gap-2" v-for="(ingredient, index) of state.ingredients">
					<UFormField :label="$t('name')" :name="`ingredients.${index}.ingredientId`" class="w-full">
						<USelectMenu v-model="ingredient.ingredientId" :items="ingredients ?? []"
							:searchable-placeholder="$t('search')"
							:placeholder="$t('formCreation.recipe.selectBy_male', { selectName: $t('ingredient').toLowerCase() })"
							option-attribute="name" value-attribute="id" searchable/>
					</UFormField>
					<UFormField :label="$t('formCreation.recipe.quantity')" :name="`ingredients.${index}.quantity`" class="w-full" eager-validation>
						<UInput v-model="ingredient.quantity" type="number" placeholder="2.6"/>
					</UFormField>
					<UFormField :label="$t('formCreation.recipe.unit')" :name="`ingredients.${index}.unitId`" class="w-full">
						<USelectMenu v-model="ingredient.unitId" :items="units ?? []"
							:searchable-placeholder="$t('search')"
						:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.unit').toLowerCase() })"
							option-attribute="name" value-attribute="id" searchable/>
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
				<UButton @click="state.sequences?.push({ title: undefined, description: undefined })"
					icon="material-symbols:add" variant="ghost">{{ $t('add') }}</UButton>
			</template>
			<div class="flex flex-col gap-4 w-full">
				<div class="flex gap-4 w-full" v-for="(sequence, index) in state.sequences" :key="index">
					<UFormField :label="$t('formCreation.recipe.title')" :name="`sequences.${index}.title`" class="w-full" eager-validation>
						<UInput v-model="sequence.title" type="string" :placeholder="$t('formCreation.recipe.sequenceTitleExample')"/>
					</UFormField>
					<UFormField :label="$t('formCreation.recipe.description')" :name="`sequences.${index}.description`" class="w-full" eager-validation>
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
			<UFormField :label="$t('ustensil', 2)" name="ustensils" class="w-full">
				<USelectMenu v-model="state.ustensils" :items="ustensils ?? []" multiple
					:searchable-placeholder="$t('search')"
					:placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('ustensil', 2).toLowerCase() })"
					option-attribute="name" value-attribute="id" searchable/>
			</UFormField>
			<UFormField :label="$t('category')" name="recipesCategoryId" class="w-full">
				<USelectMenu v-model="state.recipesCategoryId" :items="recipesCategories ?? []"
					:searchable-placeholder="$t('search')"
					:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.category').toLowerCase() })"
					option-attribute="name" value-attribute="id" searchable @update:modelValue="state.recipesCategoryId = Number($event)"/>
			</UFormField>
			<UFormField :label="$t('formCreation.recipe.season')" name="seasonId" class="w-full">
				<USelectMenu v-model="state.seasonId" :items="seasons ?? []"
					:placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.season').toLowerCase() })"
					option-attribute="name" value-attribute="id" @update:modelValue="state.seasonId = Number($event)"/>
			</UFormField>
		</div>
		<UFormField :label="$t('allergens')" name="allergens" class="w-full" :hint="$t('formCreation.recipe.optional')">
			<USelectMenu v-model="state.allergens" :items="allergens ?? []" multiple
				:searchable-placeholder="$t('search')"
				:placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('allergens').toLowerCase() })"
				option-attribute="name" value-attribute="id" searchable/>
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

</style>
