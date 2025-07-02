
<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';
import { authClient } from '~/utils/auth-client';

defineProps<{
	collapsed?: boolean;
}>();

const { t } = useI18n();
const { data: session } = await authClient.useSession(useFetch);
const user = session.value?.user;
const items = computed(
	() =>
		[
			[
				{
					label: t('mainSlideOver.settings'),
					icon: 'material-symbols:settings',
				},
				{
					label: t('mainSlideOver.dashboard'),
					icon: 'material-symbols:space-dashboard-outline',
					to: '/user/dashboard',
				},
			],
			[
				{
					label: t('mainSlideOver.github'),
					icon: 'i-simple-icons-github',
					to: 'https://github.com/nuxt-ui-pro/dashboard',
					target: '_blank',
				},
			],
			[
				{
					label: t('mainSlideOver.logout'),
					icon: 'material-symbols:logout',
					onSelect: (_event: Event) => signout(),
				},
			],
		] satisfies DropdownMenuItem[][],
);

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
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
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
