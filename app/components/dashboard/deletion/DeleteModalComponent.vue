<script lang="ts" setup>
const props = defineProps<{
  itemName: string;
  itemType?: string;
}>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
}>();

const { t } = useI18n();
</script>

<template>
  <UModal
    :title="$t('dashboard.deletion.title')"
    prevent-close
  >
    <template #body>
      <div class="py-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          {{ $t('dashboard.deletion.message', { item: props.itemName, type: props.itemType || '' }) }}
        </p>
      </div>
      <div class="flex justify-end gap-3 mt-4">
        <UButton
          variant="outline"
          @click="emit('cancel')"
        >
          {{ $t('dashboard.deletion.cancel') }}
        </UButton>
        <UButton
          color="error"
          @click="emit('confirm')"
        >
          {{ $t('dashboard.deletion.confirm') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>