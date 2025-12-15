<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { registerSchema } from '~/schemas/auth/register';
import type { RegisterSchema } from '~/schemas/auth/register';

const { t } = useI18n();
const toast = useToast();
const nuxtApp = useNuxtApp();
const { fetch: refreshSession } = useUserSession();
const { start, finish } = useLoadingIndicator();

const fields = computed(() => [
  {
    name: 'username',
    type: 'text' as const,
    label: t('auth.username'),
    required: true,
  },
  {
    name: 'password',
    label: t('auth.password'),
    type: 'password' as const,
    required: true,
  },
]);

async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
  start();
  try {
    await useAuthRequest().register(event.data, { onResponse: async ({ response }) => {
      if (response._data.success) {
        await refreshSession();
        await nuxtApp.runWithContext(() =>
          navigateTo('/recipes/all'),
        );
        toast.add({
          title: t('auth.register.toast', { username: event.data.username }),
        });
      }
      else {
        toast.add({
          title: t(response._data.error),
          color: 'error',
        });
      }
    } });
  }
  finally {
    finish();
  }
}
</script>

<template>
  <div class="w-full h-full mt-10">
    <UAuthForm
      :schema="registerSchema"
      :title="$t('auth.register.title')"
      :description="$t('auth.register.description')"
      icon="i-lucide-user"
      :fields="fields"
      :submit="{ label: $t('auth.register.button') }"
      @submit="onSubmit"
    />
  </div>
</template>
