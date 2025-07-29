<script setup lang="ts">
import { authClient } from '~/utils/auth-client';

const { t } = useI18n();
const toast = useToast();

async function onConnect() {
  const response = await authClient.signIn.anonymous();

  if (response.error != null) {
    toast.add({
      title: t('auth.anonymous.failedToastTitle'),
      description: response.error.message,
      color: 'error',
    });
    return;
  }

  await navigateTo('/recipes/all');
}
</script>

<template>
  <div class="w-full h-full mt-10">
    <div class="text-center space-y-6">
      <div class="flex flex-col items-center space-y-4">
        <UIcon
          name="i-lucide-eye"
          class="w-12 h-12 text-primary"
        />
        <h2 class="text-xl font-semibold">
          {{ $t('auth.anonymous.title') }}
        </h2>
        <p class="text-gray-600 text-sm max-w-sm">
          {{ $t('auth.anonymous.description') }}
        </p>
      </div>

      <UButton
        color="primary"
        size="lg"
        class="w-full"
        @click="onConnect"
      >
        {{ $t('auth.anonymous.button') }}
      </UButton>

      <div class="text-xs text-gray-500 space-y-1">
        <p>{{ $t('auth.anonymous.limitations.title') }}</p>
        <ul class="list-disc list-inside text-left space-y-1">
          <li>{{ $t('auth.anonymous.limitations.noCreation') }}</li>
          <li>{{ $t('auth.anonymous.limitations.noUserPages') }}</li>
          <li>{{ $t('auth.anonymous.limitations.viewOnly') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>