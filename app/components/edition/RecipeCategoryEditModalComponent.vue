<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { recipesCategoryCreation } from '~/schemas/creation/recipesCategory';
import type { RecipesCategoryCreationSchema } from '~/schemas/creation/recipesCategory';

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
const { data: recipeCategory, error } = await useRecipesCategoriesRequest().getById(props.recipeCategoryId, {
  watch: false,
});

if (error.value || !recipeCategory.value) {
  emit('close', false);
}

// Fetch dish types
const { data: dishTypesRaw } = await useDishTypesRequest().getAllCached({
  watch: false,
  default: () => [],
});
const dishTypes = computed(() => mapSelectMenuItemsUtils(dishTypesRaw.value));

// Initialize form state with fetched data
const state = ref<{
  name?: string;
  dishTypeId?: number;
}>({
  name: recipeCategory.value?.name,
  dishTypeId: recipeCategory.value?.dishTypeId,
});

async function onSubmit(event: FormSubmitEvent<RecipesCategoryCreationSchema>) {
  disabledSubmit.value = true;
  start();
  try {
    await useRecipesCategoriesRequest().update(props.recipeCategoryId, event.data, { onResponse: async () => {
      await nuxtApp.callHook('recipesCategory:updated', {
        id: props.recipeCategoryId,
      });
      toast.add({
        title: t('formEdition.category.updatedToast', { categoryName: event.data.name }),
      });
      emit('close', true);
    } });
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
