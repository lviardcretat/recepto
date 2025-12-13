<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { ustensilCreationSchema } from '~/schemas/creation/ustensil';
import type { UstensilCreationSchema } from '~/schemas/creation/ustensil';

const props = defineProps<{
  ustensilId: number;
}>();

const emit = defineEmits<{
  close: [success: boolean];
}>();

const { t } = useI18n();
const form = ref();
const nuxtApp = useNuxtApp();
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = ustensilCreationSchema;
const disabledSubmit = ref(false);

// Fetch ustensil data
const { data: ustensil, error } = await useFetch(`/api/ustensils/${props.ustensilId}`, {
  method: 'GET',
  watch: false,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
});

if (error.value || !ustensil.value) {
  emit('close', false);
}

// Initialize form state with fetched data
const state = ref<{
  name?: string;
}>({
  name: ustensil.value?.name,
});

async function onSubmit(event: FormSubmitEvent<UstensilCreationSchema>) {
  disabledSubmit.value = true;
  start();
  try {
    await $fetch(`/api/ustensils/${props.ustensilId}`, {
      method: 'PUT',
      body: event.data,
      immediate: false,
      watch: false,
      async onResponse(response) {
        await nuxtApp.callHook('ustensil:updated', {
          id: props.ustensilId,
        });
        toast.add({
          title: t('formEdition.ustensil.updatedToast', { ustensilName: event.data.name }),
        });
        emit('close', true);
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

function handleClose() {
  emit('close', false);
}
</script>

<template>
  <UModal
    :title="t('formEdition.ustensil.cardTitle')"
    :close="{ onClick: handleClose }"
    prevent-close
  >
    <template #body>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="max-h-full"
        @submit="onSubmit"
      >
        <FormUstensilFields
          v-model="state"
          :disabled="disabledSubmit"
        />
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <UButton
          variant="outline"
          @click="handleClose"
        >
          {{ t('formEdition.cancel') }}
        </UButton>
        <UButton
          :disabled="disabledSubmit"
          @click="form?.submit()"
        >
          {{ t('formEdition.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
