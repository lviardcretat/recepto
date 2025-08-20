<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui';

interface RecipeCategoryFormData {
  name?: string;
  dishTypeId?: number;
}

interface Props {
  modelValue: RecipeCategoryFormData;
  dishTypes: SelectMenuItem[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: RecipeCategoryFormData];
}>();

const { t } = useI18n();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function updateField<K extends keyof RecipeCategoryFormData>(field: K, value: RecipeCategoryFormData[K]) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UFormField
      :label="t('formCreation.name')"
      name="name"
    >
      <UInput
        :model-value="localValue.name"
        type="text"
        :placeholder="t('formCreation.category.nameExample')"
        class="w-full"
        :disabled="disabled"
        @update:model-value="updateField('name', $event)"
      />
    </UFormField>
    <UFormField
      :label="t('formCreation.category.dishType')"
      name="dishTypeId"
    >
      <USelectMenu
        :model-value="localValue.dishTypeId"
        value-key="id"
        :items="dishTypes"
        :placeholder="t('formCreation.category.selectByDishType')"
        class="w-full"
        option-attribute="name"
        value-attribute="id"
        :disabled="disabled"
        @update:model-value="updateField('dishTypeId', Number($event))"
      />
    </UFormField>
  </div>
</template>
