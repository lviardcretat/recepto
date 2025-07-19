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
  <UPageCard class="m-auto w-full max-w-md min-h-[550px] max-h-md">
    <UTabs
      :items="items"
      class="mb-6"
    >
      <template #content="{ item }">
        <div class="w-full h-full">
          <AuthLoginComponent v-if="item.type === LoginType.LOGIN" />
          <AuthRegisterComponent v-if="item.type === LoginType.REGISTER" />
        </div>
      </template>
    </UTabs>
  </UPageCard>
</template>

<style>

</style>
