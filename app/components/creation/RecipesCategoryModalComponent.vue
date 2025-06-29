<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
	recipesCategoryCreation,
	type RecipesCategoryCreation,
} from '~/schemas/creation/recipesCategory';

const emit = defineEmits(['closeModal']);
const toast = useToast();
const schema = recipesCategoryCreation;
const form = ref();
const state = ref<{
	name?: string;
	dishTypeId?: number;
}>({
	name: undefined,
	dishTypeId: undefined,
});

const { data: dishTypes } = await useFetch('/api/dishTypes/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
	transform: (dishTypes) => {
		return mapSelectMenuItemsUtils(dishTypes);
	},
});

async function onSubmit(event: FormSubmitEvent<RecipesCategoryCreation>) {
	await $fetch('/api/recipesCategories', {
		method: 'POST',
		body: event.data,
		immediate: false,
		watch: false,
		onResponse() {
			useEvent('recipesCategory:created', true);
			emit('closeModal');
			toast.add({
				title: `La catégorie ${event.data.name} a bien été ajouté !`,
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
	<UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormField :label="$t('formCreation.name')" name="name">
			<UInput v-model="state.name" type="text" :placeholder="$t('formCreation.category.nameExample')" class="w-full"/>
		</UFormField>
		<UFormField :label="$t('formCreation.category.dishType')" name="dishTypeId">
			<USelectMenu v-model="state.dishTypeId" value-key="id" :items="dishTypes ?? []"
				:placeholder="$t('formCreation.category.selectByDishType')" class="w-full"
				option-attribute="name" value-attribute="id" @update:modelValue="state.dishTypeId = Number($event)"/>
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
