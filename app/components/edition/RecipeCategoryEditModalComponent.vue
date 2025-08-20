<script lang="ts" setup>
import type { FormSubmitEvent, SelectMenuItem } from '#ui/types';
import { recipesCategoryCreation } from '~/schemas/creation/recipesCategory';
import type { RecipesCategoryCreation } from '~/schemas/creation/recipesCategory';

const props = defineProps<{
  recipeCategoryId: number;
}>();

const emit = defineEmits<{
  close: [success: boolean];
}>();

const { t } = useI18n();
const form = ref();
const nuxtApp = useNuxtApp();
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = recipesCategoryCreation;
const disabledSubmit = ref(false);

// Fetch recipe category data
const { data: recipeCategory, error } = await useFetch<RecipesCategory>(`/api/recipesCategories/${props.recipeCategoryId}`, {
  method: 'GET',
  watch: false,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
});

if (error.value || !recipeCategory.value) {
  emit('close', false);
}

// Fetch dish types
const { data: dishTypes } = await useFetch('/api/dishTypes/all', {
  method: 'GET',
  watch: false,
  default: () => [] satisfies SelectMenuItem[],
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

// Initialize form state with fetched data
const state = ref<{
  name?: string;
  dishTypeId?: number;
}>({
  name: recipeCategory.value?.name,
  dishTypeId: recipeCategory.value?.dishTypeId,
});

async function onSubmit(event: FormSubmitEvent<RecipesCategoryCreation>) {
  disabledSubmit.value = true;
  start();
  try {
    await $fetch(`/api/recipesCategories/${props.recipeCategoryId}`, {
      method: 'PUT',
      body: event.data,
      immediate: false,
      watch: false,
      async onResponse(response) {
        await nuxtApp.callHook('recipesCategory:updated', {
          id: props.recipeCategoryId,
        });
        toast.add({
          title: t('formEdition.category.updatedToast', { categoryName: event.data.name }),
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
    :title="t('formEdition.category.cardTitle')"
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
        <FormRecipeCategoryFields
          v-model="state"
          :dish-types="dishTypes"
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
