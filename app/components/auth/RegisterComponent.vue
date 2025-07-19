<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/utils/auth-client';

const { t } = useI18n();
const toast = useToast();
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

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const response = await authClient.signUp.email({
    username: payload.data.username,
    name: payload.data.username,
    email: `recepto-prod-${payload.data.username}@email.com`,
    password: payload.data.password,
  });

  if (response.error != null) {
    toast.add({
      title: t('auth.register.failedToastTitle'),
      description: response.error.message,
      color: 'error',
    });
    return null;
  }

  return await navigateTo('/recipes/all');
}
</script>

<template>
  <div class="w-full h-full mt-10">
    <UAuthForm
      :schema="schema"
      :title="$t('auth.register.title')"
      :description="$t('auth.register.description')"
      icon="i-lucide-user"
      :fields="fields"
      :submit="{ label: $t('auth.register.button') }"
      @submit="onSubmit"
    />
  </div>
</template>
