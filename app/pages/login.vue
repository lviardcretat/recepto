<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui';
import { LoginType } from '~/enums/login';

definePageMeta({
  layout: 'auth',
});

const { t } = useI18n();
const items = computed(
  () =>
[
  {
    label: t('auth.login.tab'),
    icon: 'i-lucide-lock',
    type: LoginType.LOGIN,
  },
  {
    label: t('auth.register.tab'),
    icon: 'i-lucide-user',
    type: LoginType.REGISTER,
  },
] satisfies TabsItem[],
);
</script>

<template>
  <UPageCard class="m-auto">
    <UTabs
      :items="items"
      class="mb-6"
    >
      <template #content="{ item }">
        <AuthLoginComponent v-if="item.type === LoginType.LOGIN" />
        <AuthRegisterComponent v-if="item.type === LoginType.REGISTER" />
      </template>
    </UTabs>
  </UPageCard>
</template>

<style>

</style>
