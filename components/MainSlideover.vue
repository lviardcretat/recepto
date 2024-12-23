<script setup lang="ts">
const test = useTest();

const links = [
	{
		label: 'Recettes',
		icon: 'material-symbols:fastfood',
		to: '/recipes/all',
	},
	{
		label: 'Planning',
		icon: 'material-symbols:calendar-today',
		badge: '4',
	},
	{
		label: 'Liste de course',
		icon: 'ic:baseline-featured-play-list',
	},
	{
		label: 'Dashboard',
		icon: 'material-symbols:space-dashboard-outline',
		to: '/user/dashboard',
	},
	{
		label: 'Settings',
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
	<UDashboardSlideover v-model="test" title="Menu" side="right">
		<UDashboardPanel>
			<UDashboardSearchButton label="Search..." />
			<UDashboardSidebar>
				<UDashboardSidebarLinks :links="links" />
			</UDashboardSidebar>
		</UDashboardPanel>
	</UDashboardSlideover>
</template>

<style lang="scss">

</style>
