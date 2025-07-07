<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { ingredientCreationSchema } from '~/schemas/creation/ingredient';
import type { IngredientCreation } from '~/schemas/creation/ingredient';
import { Months } from '~/enums/data';

const props = defineProps<{
  modalTitle: string;
}>();
const emit = defineEmits(['closeModal']);
const toast = useToast();
const schema = ingredientCreationSchema;
const form = ref();
const state = ref<{
  name?: string;
  foodTypeId?: number;
  seasonalMonths?: number[][];
}>({
  name: undefined,
  foodTypeId: undefined,
  seasonalMonths: undefined,
});

const flatSeasonalMonths = ref<number[]>([]);
const { data: foodTypes } = await useFetch('/api/foodTypes/all', {
  method: 'GET',
  watch: false,
  default: () => null,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
  transform: (foodTypes) => {
    return mapSelectMenuItemsUtils(foodTypes);
  },
});

async function onSubmit(event: FormSubmitEvent<IngredientCreation>) {
  await $fetch('/api/ingredients', {
    method: 'POST',
    watch: false,
    body: event.data,
    default: () => null,
    onResponse() {
      useEvent('ingredient:created', true);
      emit('closeModal');
      toast.add({
        title: `L'ingrédient ${event.data.name} a bien été ajouté !`,
      });
    },
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });
}

function toggleMonth(monthId: number): void {
  if (flatSeasonalMonths.value.includes(monthId)) {
    flatSeasonalMonths.value = flatSeasonalMonths.value.filter(
      m => m !== monthId,
    );
  }
  else {
    flatSeasonalMonths.value.push(monthId);
  }
  mapFlatMonthsToSeasonalMonths();
}

function mapFlatMonthsToSeasonalMonths(): void {
  if (flatSeasonalMonths.value.length === 0) {
    state.value.seasonalMonths = undefined;
    return;
  }
  flatSeasonalMonths.value = flatSeasonalMonths.value.sort((n1, n2) => n1 - n2);
  let startMonthId: number = flatSeasonalMonths.value[0] ?? 0;
  let endMonthId = 0;
  const mappedMonths: number[][] = [];
  for (const [index, monthId] of flatSeasonalMonths.value.entries()) {
    if (!flatSeasonalMonths.value.includes(monthId + 1)) {
      endMonthId = monthId;
      mappedMonths.push([startMonthId, endMonthId + 1]);
      startMonthId = flatSeasonalMonths.value[index + 1] ?? 0;
    }
  }
  state.value.seasonalMonths = mappedMonths;
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
          eager-validation
        >
          <UInput
            v-model="state.name"
            type="text"
            :placeholder="$t('formCreation.ingredient.nameExample')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('formCreation.ingredient.foodType')"
          name="foodTypeId"
        >
          <USelectMenu
            v-model="state.foodTypeId"
            value-key="id"
            :items="foodTypes ?? []"
            :searchable-placeholder="$t('search')"
            class="w-full"
            :placeholder="$t('formCreation.ingredient.selectByFoodTypeId')"
            option-attribute="name"
            value-attribute="id"
            @update:model-value="state.foodTypeId = Number($event)"
          />
        </UFormField>
        <UFormField
          :label="$t('formCreation.ingredient.seasonalMonths')"
          name="seasonalMonths"
          :hint="$t('formCreation.recipe.optional')"
        >
          <div class="flex justify-start flex-wrap w-full">
            <UButton
              v-for="(month, index) of Object.values(Months)"
              :key="month"
              :variant="flatSeasonalMonths.includes(index) ? 'solid' : 'ghost'"
              @click="toggleMonth(index)"
            >
              {{ $t(month) }}
            </UButton>
          </div>
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
