<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';
import { authClient } from '~/utils/auth-client';

defineProps<{
  collapsed?: boolean;
}>();

const { t } = useI18n();
const { data: session } = await authClient.useSession(useFetch);
const user = session.value?.user;
const { isAnonymous } = useAnonymousRestrictions();
const items = computed(() => {
  if (isAnonymous.value) {
    return [
      [
        {
          label: t('mainSlideOver.loginToAccess'),
          icon: 'i-lucide-log-in',
          onSelect: (_event: Event) => navigateTo('/login'),
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
        {
          label: t('mainSlideOver.logout'),
          icon: 'i-lucide-log-out',
          onSelect: (_event: Event) => signout(),
        },
      ],
    ] satisfies DropdownMenuItem[][];
  }

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
      {
        label: t('mainSlideOver.logout'),
        icon: 'i-lucide-log-out',
        onSelect: (_event: Event) => signout(),
      },
    ],
  ] satisfies DropdownMenuItem[][];
});

async function signout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: async () => {
        await navigateTo('/');
      },
    },
  });
}
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? 
          undefined : 
          isAnonymous ? t('mainSlideOver.anonymous') : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      :icon="isAnonymous ? 'i-lucide-eye' : 'i-lucide-user'"
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
