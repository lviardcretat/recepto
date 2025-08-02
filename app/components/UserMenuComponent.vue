<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
  collapsed?: boolean;
}>();

const { t } = useI18n();
const { user, clear } = useUserSession();
const items = computed(() => {
  return [
    [
      {
        label: t('mainSlideOver.settings'),
        icon: 'i-lucide-settings',
        disabled: true,
      },
      {
        label: t('mainSlideOver.dashboard'),
        icon: 'i-lucide-layout-dashboard',
        to: '/user/dashboard',
        disabled: true,
      },
    ],
    [
      {
        label: t('mainSlideOver.github'),
        icon: 'i-lucide-github',
        to: 'https://github.com/lviardcretat/recepto',
        target: '_blank',
      },
      {
        label: t('mainSlideOver.discord'),
        icon: 'ic:baseline-discord',
        to: 'https://discord.gg/vF7FbDpDwt',
        target: '_blank',
      },
    ],
    [
      user.value?.isAnonymous
        ? {
            label: t('auth.login.title'),
            icon: 'i-lucide-log-in',
            onSelect: (_event: Event) => redirectToLoginPage(),
          }
        : {
            label: t('mainSlideOver.logout'),
            icon: 'i-lucide-log-out',
            onSelect: (_event: Event) => signout(),
          },
    ],
  ] satisfies DropdownMenuItem[][];
});

async function signout() {
  await clear();
  await navigateTo('/');
}

async function redirectToLoginPage() {
  await clear();
  await navigateTo('/login');
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
