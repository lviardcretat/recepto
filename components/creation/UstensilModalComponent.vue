<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
	ustensilCreationSchema,
	type UstensilCreationSchema,
} from '~/schemas/creation/ustensil';
const form = ref();
const emit = defineEmits(['closeModal']);
const toast = useToast();
const schema = ustensilCreationSchema;
const state = ref<{
	name?: string;
}>({
	name: undefined,
});

async function onSubmit(event: FormSubmitEvent<UstensilCreationSchema>) {
	await $fetch('/api/ustensils', {
		method: 'POST',
		body: event.data,
		immediate: false,
		watch: false,
		onResponse() {
			useEvent('ustensil:created', true);
			emit('closeModal');
			toast.add({
				title: `L'ustensile ${event.data.name} a bien été ajouté !`,
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
			<UInput v-model="state.name" type="text" :placeholder="$t('formCreation.ustensil.nameExample')" class="w-full"/>
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
