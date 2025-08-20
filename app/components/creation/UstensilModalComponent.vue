<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
  ustensilCreationSchema,

} from '~/schemas/creation/ustensil';
import type { UstensilCreationSchema } from '~/schemas/creation/ustensil';

const props = defineProps<{
  modalTitle: string;
  ustensilName?: string;
}>();
const { t } = useI18n();
const form = ref();
const nuxtApp = useNuxtApp();
const emit = defineEmits(['closeModal']);
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = ustensilCreationSchema;
const disabledSubmit = ref(false);
const state = ref<{
  name?: string;
}>({
  name: props.ustensilName,
});

async function onSubmit(event: FormSubmitEvent<UstensilCreationSchema>) {
  disabledSubmit.value = true;
  start();
  try {
    await $fetch('/api/ustensils', {
      method: 'POST',
      body: event.data,
      immediate: false,
      watch: false,
      async onResponse(response) {
        await nuxtApp.callHook('ustensil:created', {
          id: response.response._data.id,
        });
        emit('closeModal');
        toast.add({
          title: t('formCreation.ustensil.createdToast', { ustensilName: event.data.name }),
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
  finally {
    finish();
    disabledSubmit.value = false;
  }
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
            icon="i-lucide-x"
            class="-my-1"
            @click="emit('closeModal')"
          />
        </div>
      </template>
      <FormUstensilFields
        v-model="state"
        :disabled="disabledSubmit"
      />
      <template #footer>
        <div class="flex justify-between">
          <UButton
            variant="outline"
            @click="form.clear()"
          >
            {{ $t('formCreation.clear') }}
          </UButton>
          <UButton
            type="submit"
            :disabled="disabledSubmit"
          >
            {{ $t('formCreation.submit') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<style lang="scss" scoped>

</style>
