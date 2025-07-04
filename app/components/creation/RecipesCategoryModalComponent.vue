<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
	recipesCategoryCreation,
	type RecipesCategoryCreation,
} from '~/schemas/creation/recipesCategory';

const props = defineProps<{
	modalTitle: string;
}>();
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
	<UForm ref="form" :schema="schema" :state="state" class="max-h-full" @submit="onSubmit">
		<UCard :ui="{root: 'max-h-full flex flex-col', body: 'overflow-auto'}">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
						{{ $t(`formCreation.${props.modalTitle}.cardTitle`) }}
					</h3>
					<UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emit('closeModal')" />
				</div>
			</template>
			<div class="flex flex-col gap-4">
				<UFormField :label="$t('formCreation.name')" name="name">
					<UInput v-model="state.name" type="text" :placeholder="$t('formCreation.category.nameExample')" class="w-full"/>
				</UFormField>
				<UFormField :label="$t('formCreation.category.dishType')" name="dishTypeId">
					<USelectMenu v-model="state.dishTypeId" value-key="id" :items="dishTypes ?? []"
						:placeholder="$t('formCreation.category.selectByDishType')" class="w-full"
						option-attribute="name" value-attribute="id" @update:modelValue="state.dishTypeId = Number($event)"/>
				</UFormField>
			</div>
			<template #footer>
				<div class="flex justify-between">
					<UButton variant="outline" @click="form.clear()">
						{{ $t('formCreation.clear') }}
					</UButton>
					<UButton type="submit">
						{{ $t('formCreation.submit') }}
					</UButton>
				</div>
			</template>
		</UCard>
	</UForm>
</template>

<style lang="scss" scoped>

</style>
