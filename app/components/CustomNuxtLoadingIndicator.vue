<script setup lang="ts">
const { isLoading } = useLoadingIndicator();

watch(() => isLoading.value, (shouldBlock) => {
  if (import.meta.client) {
    document.body.style.overflow = shouldBlock ? 'hidden' : '';
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Teleport
    to="body"
  >
    <div
      class="absolute h-screen w-screen inset-0 z-999999 pointer-events-none flex items-center
      justify-center bg-gray-900/20 dark:bg-gray-900/40 backdrop-blur-sm"
    >
      <div
        class="flex flex-col items-center justify-center space-y-4 pointer-events-none w-full h-full"
      >
        <span
          class="spinner border-primary border-4 border-solid border-b-transparent rounded-[50%]
          inline-block box-border"
        />
        <p
          class="text-sm text-gray-600 dark:text-gray-300 font-medium pointer-events-none"
        >
          {{ $t('loading') }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
  .spinner {
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
        -webkit-transform: rotate(360deg);
        transform:rotate(360deg);
    }
  }
</style>
