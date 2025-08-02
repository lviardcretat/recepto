<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale';

const { locale } = useI18n();
const { isLoading } = useLoadingIndicator();
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});
</script>

<template>
  <UApp
    :toaster="{ position: 'bottom-left' }"
    :tooltip="{ disableHoverableContent: true, delayDuration: 0 }"
    :locale="locales[locale]"
  >
    <CustomNuxtLoadingIndicator
      v-if="isLoading"
    />
    <UMain
      :class="isLoading ? 'pointer-events-none' : ''"
    >
      <NuxtLayout>
        <SeasonalChartComponent />
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
