<script setup lang="ts">
const test = useTest();

const links = [
	{
		label: 'recipes',
		icon: 'material-symbols:fastfood',
	},
	{
		label: 'schedule',
		icon: 'material-symbols:calendar-today',
		badge: '4',
	},
	{
		label: 'shoppingList',
		icon: 'ic:baseline-featured-play-list',
	},
	{
		label: 'settings',
		icon: 'i-heroicons-cog-8-tooth',
		children: [
			{
				label: 'General',
			},
			{
				label: 'Members',
			},
			{
				label: 'Notifications',
			},
		],
	},
];
</script>

<template>
	<UDashboardSlideover v-model="test" :title="$t('menu')" side="right">
		<UDashboardPanel>
			<UDashboardSearchButton :label="$t('search')" />
			<UDashboardSidebar>
				<UDashboardSidebarLinks :links="links">
					<template #default="{ link }">
						<div>{{ $t(link.label) }}</div>
					</template>
				</UDashboardSidebarLinks>
			</UDashboardSidebar>
		</UDashboardPanel>
	</UDashboardSlideover>
</template>

<style lang="scss">

</style>
