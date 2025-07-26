<script setup lang="ts">
import * as z from 'zod';
import type { ButtonProps, FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/utils/auth-client';

const { t } = useI18n();
const toast = useToast();

// Provider anonyme
const providers = computed<ButtonProps[]>(() => [
  {
    label: t('auth.login.anonymousProvider'),
    icon: 'i-lucide-user-x',
    variant: 'outline' as const,
    onClick: async () => await handleAnonymousLogin(),
  },
]);

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
  {
    name: 'remember',
    label: t('auth.login.rememberMe'),
    type: 'checkbox' as const,
  },
]);

const schema = z.object({
  username: z.string().min(3, 'Trop court !'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const response = await authClient.signIn.username({
    username: payload.data.username,
    password: payload.data.password,
    rememberMe: payload.data.rememberMe,
  });

  if (response.error != null) {
    toast.add({
      title: t('auth.login.failedToastTitle'),
      description: response.error.message,
      color: 'error',
    });
    return null;
  }

  return await navigateTo('/recipes/all');
}

// Fonction pour la connexion anonyme
async function handleAnonymousLogin() {
  try {
    const response = await authClient.signIn.anonymous();

    if (response.error) {
      toast.add({
        title: t('auth.login.anonymousFailedToastTitle'),
        description: response.error.message,
        color: 'error',
      });
      return;
    }

    toast.add({
      title: t('auth.login.anonymousSuccessToastTitle'),
      description: t('auth.login.anonymousSuccessToastDescription'),
      color: 'success',
    });

    await navigateTo('/recipes/all');
  }
  catch (error) {
    console.error('Erreur lors de la connexion anonyme:', error);
    toast.add({
      title: t('auth.login.anonymousFailedToastTitle'),
      description: t('auth.login.anonymousFailedToastDescription'),
      color: 'error',
    });
  }
}
</script>

<template>
  <div class="w-full h-full mt-10">
    <UAuthForm
      :schema="schema"
      :title="$t('auth.login.title')"
      :description="$t('auth.login.description')"
      icon="i-lucide-lock"
      :fields="fields"
      :providers="providers"
      :submit="{ label: $t('auth.login.button') }"
      @submit="onSubmit"
    />
  </div>
</template>
