
<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';
import { authClient } from '~/utils/auth-client';

defineProps<{
	collapsed?: boolean;
}>();

const { data: session } = await authClient.useSession(useFetch);
const user = session.value?.user;
const items = ref<DropdownMenuItem[][]>([
	[
		{
			label: 'mainSlideOver.settings',
			icon: 'material-symbols:settings',
		},
		{
			label: 'mainSlideOver.dashboard',
			icon: 'material-symbols:space-dashboard-outline',
			to: '/user/dashboard',
		},
	],
	[
		{
			label: 'GitHub',
			icon: 'i-simple-icons-github',
			to: 'https://github.com/nuxt-ui-pro/dashboard',
			target: '_blank',
		},
	],
	[
		{
			label: 'mainSlideOver.logout',
			icon: 'material-symbols:logout',
			onSelect: (_event: Event) => signout(),
		},
	],
]);

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
	<template #item-label="{ item }">
		{{ $t(item.label ?? "", 1) }}
	</template>
    <template #chip-leading="{ item }">
      <span class="ms-0.5 size-2 rounded-full"/>
    </template>
  </UDropdownMenu>
</template>

<style>

</style>
