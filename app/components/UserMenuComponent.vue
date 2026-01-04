<script lang="ts" setup>
import { createUserMenuConfig } from '~/config/UserMenuConfig';

defineProps<{
  collapsed?: boolean;
}>();

const { t } = useI18n();
const { user, clear } = useUserSession();
const nuxtApp = useNuxtApp();

const items = createUserMenuConfig(t, {
  isAnonymous: user.value?.isAnonymous ?? false,
  redirectToLoginPage,
  signout,
});

async function signout() {
  await clear();
  await nuxtApp.runWithContext(() => navigateTo('/'));
}

async function redirectToLoginPage() {
  await clear();
  await nuxtApp.runWithContext(() => navigateTo('/login'));
}
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      :label="collapsed ? undefined : user?.username"
      :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
      icon="i-lucide-user"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
    />
  </UDropdownMenu>
</template>

<style>

</style>
