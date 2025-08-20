<script lang="ts" setup>
interface UstensilFormData {
  name?: string;
}

interface Props {
  modelValue: UstensilFormData;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: UstensilFormData];
}>();

const { t } = useI18n();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function updateField<K extends keyof UstensilFormData>(field: K, value: UstensilFormData[K]) {
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
      eager-validation
    >
      <UInput
        :model-value="localValue.name"
        type="text"
        :placeholder="t('formCreation.ustensil.nameExample')"
        class="w-full"
        :disabled="disabled"
        @update:model-value="updateField('name', $event)"
      />
    </UFormField>
  </div>
</template>