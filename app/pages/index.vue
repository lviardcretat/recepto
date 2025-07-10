<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { PageFeatureProps } from '@nuxt/ui-pro';

definePageMeta({
  layout: 'auth',
});

const { t } = useI18n();
const pageHeroLinks = computed(
  () =>
[
  {
    label: t('heroPage.loginButton'),
    to: '/login',
    icon: 'i-lucide-log-in',
  },
] satisfies ButtonProps[],
);
const pageSectionFeatures = computed(
  () =>
[
  {
    title: t('heroPage.features.recipe.title'),
    description: t('heroPage.features.recipe.description'),
    icon: 'i-lucide-book',
  },
  {
    title: t('heroPage.features.filter.title'),
    description: t('heroPage.features.filter.description'),
    icon: 'i-lucide-filter',
  },
  {
    title: t('heroPage.features.planner.title'),
    description: t('heroPage.features.planner.description'),
    icon: 'i-lucide-calendar',
  },
  {
    title: t('heroPage.features.dashboard.title'),
    description: t('heroPage.features.dashboard.description'),
    icon: 'i-lucide-layout-dashboard',
  },
  {
    title: t('heroPage.features.privacy.title'),
    description: t('heroPage.features.privacy.description'),
    icon: 'i-lucide-lock',
  },
  {
    title: t('heroPage.features.collaborative.title'),
    description: t('heroPage.features.collaborative.description'),
    icon: 'i-lucide-users',
  },
] satisfies PageFeatureProps[],
);
const pageSectionLinks = computed(
  () =>
[
  {
    label: t('heroPage.loginButton'),
    to: '/login',
    icon: 'i-lucide-log-in',
  },
] satisfies ButtonProps[],
);
</script>

<template>
  <div>
    <UPageHero
      :title="$t('heroPage.title')"
      headline="0.1.0-alpha"
      orientation="horizontal"
      :description="$t('heroPage.description')"
      :links="pageHeroLinks"
    >
      <NuxtImg
        class="rounded-lg shadow-2xl ring ring-default"
        src="/sample.png"
      />
    </UPageHero>
    <UPageSection
      :title="$t('heroPage.features.title')"
      icon="i-lucide-boxes"
      :features="pageSectionFeatures"
      :links="pageSectionLinks"
    />
  </div>
</template>
