<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import {
  recipesCategoryCreation,

} from '~/schemas/creation/recipesCategory';
import type { RecipesCategoryCreation } from '~/schemas/creation/recipesCategory';

const props = defineProps<{
  modalTitle: string;
  recipeCategoryName?: string;
}>();
const { t } = useI18n();
const nuxtApp = useNuxtApp();
const emit = defineEmits(['closeModal']);
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = recipesCategoryCreation;
const form = ref();
const disabledSubmit = ref(false);
const state = ref<{
  name?: string;
  dishTypeId?: number;
}>({
  name: props.recipeCategoryName,
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
  disabledSubmit.value = true;
  start();
  try {
    await $fetch('/api/recipesCategories', {
      method: 'POST',
      body: event.data,
      immediate: false,
      watch: false,
      async onResponse(response) {
        await nuxtApp.callHook('recipesCategory:created', {
          id: response.response._data.id,
        });
        emit('closeModal');
        toast.add({
          title: t('formCreation.category.createdToast', { categoryName: event.data.name }),
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
    disabledSubmit.value = false;
    finish();
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
      <FormRecipeCategoryFields
        v-model="state"
        :dish-types="dishTypes ?? []"
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
