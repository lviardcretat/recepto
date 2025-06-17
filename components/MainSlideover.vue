<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { authClient } from '~/lib/auth-client';

const { t } = useI18n();
const links: NavigationMenuItem[] = [
	{
		label: t('mainSlideOver.search'),
		icon: 'cil:magnifying-glass',
		to: '/search',
	},
	{
		label: t('mainSlideOver.recipes'),
		icon: 'material-symbols:fastfood',
		to: '/recipes/all',
	},
	{
		label: t('mainSlideOver.dashboard'),
		icon: 'material-symbols:space-dashboard-outline',
		to: '/user/dashboard',
	},
	{
		label: t('mainSlideOver.account'),
		icon: 'i-lucide-user',
		to: '/user/account',
	},
	{
		label: t('mainSlideOver.calendar'),
		icon: 'material-symbols:calendar-today',
		disabled: true,
	},
];

async function signout() {
	await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				navigateTo('/');
			},
		},
	});
}
</script>

<template>
	<USlideover :title="$t('menu')" side="right">
		<UButton variant="link"
			icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"/>
		<template #body>
			<UNavigationMenu :items="links" orientation="vertical">
				<template #item-content="{ item }">
					<div>{{ item.label }}</div>
				</template>
			</UNavigationMenu>
		</template>
		<template #footer>
			<UButton size="lg" variant="ghost" color="neutral" trailing-icon="material-symbols:logout"
				@click="signout()" class="ml-auto">Se déconnecter</UButton>
		</template>
	</USlideover>
</template>

<style lang="scss">

</style>
