<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import type { IngredientCreation } from '~/schemas/creation/ingredient';

const nuxtApp = useNuxtApp();
const props = defineProps<{
  modalTitle: string;
  ingredientName?: string;
}>();
const flatSeasonalMonths = ref<number[]>([]);
const { t } = useI18n();
const emit = defineEmits(['closeModal']);
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = ingredientCreationSchema;
const form = ref();
const disabledSubmit = ref(false);
const state = ref<{
  name?: string;
  foodTypeId?: number;
  seasonalMonths?: number[][];
}>({
  name: props.ingredientName,
  foodTypeId: undefined,
  seasonalMonths: undefined,
});

const { data: foodTypesRaw } = await useFoodTypesRequest().getAllCached({
  watch: false,
  default: () => [],
});
const foodTypes = computed(() => mapSelectMenuItemsUtils(foodTypesRaw.value));

async function onSubmit(event: FormSubmitEvent<IngredientCreation>) {
  disabledSubmit.value = true;
  start();
  try {
    await useIngredientsRequest().create(event.data, { onResponse: async (response) => {
      await nuxtApp.callHook('ingredient:created', {
        id: response.response._data.id,
      });
      emit('closeModal');
      toast.add({
        title: t('formCreation.ingredient.createdToast', { ingredientName: event.data.name }),
      });
    } });
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
      <FormIngredientFields
        v-model="state"
        :food-types="foodTypes"
        :disabled="disabledSubmit"
        :flat-seasonal-months="flatSeasonalMonths"
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

<style lang="scss">

</style>
