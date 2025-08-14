<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
            {{ $t('modal.delete.title') }}
          </h3>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            class="-my-1"
            @click="emit('cancel')"
          />
        </div>
      </template>

      <div class="py-4">
        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          {{ $t('modal.delete.message', { item: props.itemName }) }}
        </p>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            variant="outline"
            @click="emit('cancel')"
          >
            {{ $t('modal.delete.cancel') }}
          </UButton>
          <UButton
            color="error"
            @click="emit('confirm')"
          >
            {{ $t('modal.delete.confirm') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{
  itemName: string;
}>();

const emit = defineEmits<{
  cancel: [];
  confirm: [];
}>();
</script>
