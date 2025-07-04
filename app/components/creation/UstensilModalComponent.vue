<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
  ustensilCreationSchema,

} from '~/schemas/creation/ustensil';
import type { UstensilCreationSchema } from '~/schemas/creation/ustensil';

const form = ref();
const props = defineProps<{
  modalTitle: string;
}>();
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
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="max-h-full"
    @submit="onSubmit"
  >
    <UCard :ui="{ root: 'max-h-full flex flex-col', body: 'overflow-auto grow' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
            {{ $t(`formCreation.${props.modalTitle}.cardTitle`) }}
          </h3>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="emit('closeModal')"
          />
        </div>
      </template>
      <div class="flex flex-col gap-4">
        <UFormField
          :label="$t('formCreation.name')"
          name="name"
        >
          <UInput
            v-model="state.name"
            type="text"
            :placeholder="$t('formCreation.ustensil.nameExample')"
            class="w-full"
          />
        </UFormField>
      </div>
      <template #footer>
        <div class="flex justify-between">
          <UButton
            variant="outline"
            @click="form.clear()"
          >
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
