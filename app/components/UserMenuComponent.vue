<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';
import { authClient } from '~/utils/auth-client';

defineProps<{
  collapsed?: boolean;
}>();

const { t } = useI18n();
const { data: session } = await authClient.useSession(useFetch);
const user = session.value?.user;
const { checkIsAnonymous } = useAnonymousUser();

// Vérifier si l'utilisateur est anonyme
const isAnonymous = ref(false);
onMounted(async () => {
  isAnonymous.value = await checkIsAnonymous();
});
const items = computed(() => {
  const baseItems: DropdownMenuItem[][] = [
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
        disabled: isAnonymous.value, // Désactivé pour les utilisateurs anonymes
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
  ];

  // Ajouter l'item login ou logout selon l'état de l'utilisateur
  if (isAnonymous.value) {
    baseItems.push([
      {
        label: t('auth.login.button'),
        icon: 'i-lucide-log-in',
        onSelect: () => navigateTo('/login'),
      },
    ]);
  }
  else {
    baseItems.push([
      {
        label: t('mainSlideOver.logout'),
        icon: 'i-lucide-log-out',
        onSelect: (_event: Event) => signout(),
      },
    ]);
  }

  return baseItems;
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
        label: collapsed ? undefined : (isAnonymous ? t('auth.anonymous.guestLabel') : user?.name),
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
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
