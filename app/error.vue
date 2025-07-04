<script setup lang="ts">
import type { NuxtError } from '#app';

const { t } = useI18n();
useSeoMeta({
  title: t('title'),
  description: t('description'),
});

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <UApp>
    <UHeader />
    <UError :error="error" />
    <UFooter />
  </UApp>
</template>
