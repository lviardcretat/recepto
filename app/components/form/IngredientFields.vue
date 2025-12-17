<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui';
import { Months } from '~/enums/data';
import type { IIIngredientFormData } from '~/types/ingredient/form';

const props = defineProps<{
  modelValue: IIngredientFormData;
  foodTypes: SelectMenuItem[];
  flatSeasonalMonths: number[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: IIngredientFormData];
  'update:flatSeasonalMonths': [value: number[]];
}>();

const { t } = useI18n();

const localValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
const flatSeasonalMonths = ref<number[]>(props.flatSeasonalMonths);

function updateField<K extends keyof IIngredientFormData>(field: K, value: IIngredientFormData[K]) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
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
  emit('update:flatSeasonalMonths', flatSeasonalMonths.value);
  mapFlatMonthsToSeasonalMonths();
}

function mapFlatMonthsToSeasonalMonths(): void {
  if (flatSeasonalMonths.value.length === 0) {
    updateField('seasonalMonths', undefined);
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
  updateField('seasonalMonths', mappedMonths);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UFormField
      :label="t('formCreation.name')"
      name="name"
      eager-validation
    >
      <UInput
        :model-value="localValue.name"
        type="text"
        :placeholder="t('formCreation.ingredient.nameExample')"
        class="w-full"
        @update:model-value="updateField('name', $event)"
      />
    </UFormField>
    <UFormField
      :label="t('formCreation.ingredient.foodType')"
      name="foodTypeId"
    >
      <USelectMenu
        :model-value="localValue.foodTypeId"
        value-key="id"
        :items="foodTypes"
        :searchable-placeholder="t('search')"
        class="w-full"
        :placeholder="t('formCreation.ingredient.selectByFoodTypeId')"
        option-attribute="name"
        value-attribute="id"
        @update:model-value="updateField('foodTypeId', Number($event))"
      />
    </UFormField>
    <UFormField
      :label="t('formCreation.ingredient.seasonalMonths')"
      name="seasonalMonths"
      :hint="t('formCreation.recipe.optional')"
    >
      <div class="flex justify-start flex-wrap w-full">
        <UButton
          v-for="(month, index) of Object.values(Months)"
          :key="month"
          :variant="flatSeasonalMonths.includes(index) ? 'solid' : 'ghost'"
          @click="toggleMonth(index)"
        >
          {{ t(month) }}
        </UButton>
      </div>
    </UFormField>
  </div>
</template>
