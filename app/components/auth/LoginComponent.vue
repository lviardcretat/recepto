<script setup lang="ts">
import type { ButtonProps, FormSubmitEvent } from '@nuxt/ui';
import { loginSchema } from '~/schemas/auth/login';
import type { LoginSchema } from '~/schemas/auth/login';

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

const providers = computed<ButtonProps[]>(() => [{
  label: t('auth.anonymous.title'),
  icon: 'i-lucide-eye',
  onClick: async () => {
    start();
    try {
      await onAnonymousConnect();
    }
    finally {
      finish();
    }
  },
}]);

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  start();
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: event.data,
      watch: false,
      async onResponse({ response }) {
        if (response._data.success) {
          await refreshSession();
          await nuxtApp.runWithContext(() =>
            navigateTo('/recipes/all'),
          );
          toast.add({
            title: t('auth.login.toast', { username: event.data.username }),
          });
        }
        else {
          toast.add({
            title: t(response._data.error),
            color: 'error',
          });
        }
      },
      onResponseError({ response }) {
        throw showError({
          statusCode: response.status,
          statusMessage: response._data.message,
        });
      },
    });
  }
  finally {
    finish();
  }
}

async function onAnonymousConnect() {
  start();
  try {
    await $fetch('/api/auth/guest', {
      method: 'POST',
      watch: false,
      async onResponse() {
        await refreshSession();
        await nuxtApp.runWithContext(() =>
          navigateTo('/recipes/all'),
        );
        toast.add({
          title: t('auth.anonymous.toast'),
        });
      },
      onResponseError({ response }) {
        throw showError({
          statusCode: response.status,
          statusMessage: response._data.message,
        });
      },
    });
  }
  finally {
    finish();
  }
}
</script>

<template>
  <div class="w-full h-full mt-10">
    <UAuthForm
      :schema="loginSchema"
      :title="$t('auth.login.title')"
      :description="$t('auth.login.description')"
      :providers="providers"
      icon="i-lucide-lock"
      :fields="fields"
      :submit="{ label: $t('auth.login.button') }"
      @submit="onSubmit"
    />
  </div>
</template>
