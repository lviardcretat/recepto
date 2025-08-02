<script lang="ts" setup>
defineEmits<{
  close: [];
}>();

const { clear } = useUserSession();

async function redirectToLoginPage() {
  await clear();
  await navigateTo('/login');
}
</script>

<template>
  <UModal
    class="max-w-md"
    @close="$emit('close')"
  >
    <template #content>
      <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
          <UIcon
            name="i-lucide-alert-circle"
            class="size-6 text-warning"
          />
          <h2 class="text-lg font-semibold">
            {{ $t('auth.anonymous.warnings.title') }}
          </h2>
        </div>

        <p class="mb-6">
          {{ $t('auth.anonymous.warnings.description') }}
        </p>

        <div class="flex gap-3 justify-between">
          <UButton
            color="neutral"
            variant="outline"
            @click="$emit('close')"
          >
            {{ $t('auth.anonymous.warnings.cancelButton') }}
          </UButton>
          <UButton
            color="primary"
            to="/login"
            @click="$emit('close'); redirectToLoginPage()"
          >
            {{ $t('auth.anonymous.warnings.loginButton') }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
