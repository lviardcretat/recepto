<script setup lang="ts">
const test = useTest();

const links = [
	{
		label: 'recipes',
		icon: 'material-symbols:fastfood',
		to: '/recipes/all',
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
		label: 'dashboard',
		icon: 'material-symbols:space-dashboard-outline',
		to: '/user/dashboard',
	},
	{
		label: 'ingredients',
		icon: 'i-heroicons-cog-8-tooth',
		children: [
			{
				label: 'ingredients',
			},
			{
				label: 'ingredients',
			},
			{
				label: 'ingredients',
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
						<!-- Don't know why but this is needed for the dashboard text to be visible -->
						<div class="z-10">{{ $t(link.label) }}</div>
					</template>
				</UDashboardSidebarLinks>
			</UDashboardSidebar>
		</UDashboardPanel>
	</UDashboardSlideover>
</template>

<style lang="scss">

</style>
