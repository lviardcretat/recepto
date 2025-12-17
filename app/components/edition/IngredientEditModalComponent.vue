<script lang="ts" setup>
import type { FormSubmitEvent, SelectMenuItem } from '#ui/types';
import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import type { IngredientCreation } from '~/schemas/creation/ingredient';
import type { FoodType } from '~~/server/utils/drizzleUtils';

const props = defineProps<{
  ingredientId: number;
}>();

const emit = defineEmits<{
  close: [success: boolean];
}>();

const { t } = useI18n();
const form = ref();
const nuxtApp = useNuxtApp();
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = ingredientCreationSchema;
const disabledSubmit = ref(false);

// Fetch ingredient data
const { data: ingredient, error } = await useIngredientsRequest().getById(props.ingredientId, { watch: false });

if (error.value || !ingredient.value) {
  emit('close', false);
}

// Fetch food types
const { data: foodTypes } = await useFoodTypesRequest().getAll<SelectMenuItem[], SelectMenuItem[]>({
  watch: false,
  default: () => [],
  transform: (foodTypes: FoodType[]) => mapSelectMenuItemsUtils(foodTypes),
});

// Initialize form state with fetched data
const state = ref<{
  name?: string;
  foodTypeId?: number;
  seasonalMonths?: number[][];
}>({
  name: ingredient.value?.name,
  foodTypeId: ingredient.value?.foodTypeId,
  seasonalMonths: ingredient.value?.seasonalMonths,
});

async function onSubmit(event: FormSubmitEvent<IngredientCreation>) {
  disabledSubmit.value = true;
  start();
  try {
    await useIngredientsRequest().update(props.ingredientId, event.data, { onResponse: async () => {
      await nuxtApp.callHook('ingredient:updated', {
        id: props.ingredientId,
      });
      toast.add({
        title: t('formEdition.ingredient.updatedToast', { ingredientName: event.data.name }),
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
    :title="t('formEdition.ingredient.cardTitle')"
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
        <FormIngredientFields
          v-model="state"
          :food-types="foodTypes"
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
