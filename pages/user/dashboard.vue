<script setup lang="ts">
const test = useTest();
const modules = [
	{
		title: '50',
		description: 'repas prévus !',
		class: 'col-span-4 row-span-2',
	},
	{
		title: '35',
		description: 'recettes créés !',
		class: 'col-span-4 row-span-1',
	},
	{
		title: '16',
		description: 'catégories créés !',
		class: 'col-span-4 row-span-1',
	},
	{
		title: '2',
		description: 'courses effectués !',
		class: 'col-span-8 row-span-1',
	},
	{
		title: '106',
		description: 'membres inscrits grâce à vous !',
		class: 'col-span-12 row-span-1',
	},
];
</script>

<template>
	<UDashboardPage class="h-full">
		<MainSlideover></MainSlideover>
		<RecipeFilter/>
		<UDashboardPanel grow>
			<UDashboardNavbar title="Recettes">
				<template #right>
					<UColorModeButton />
					<UButton
						:padded="false"
						variant="link"
						icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
						@click="test = !test"/>
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent>
				<ULandingSection title="Vous avez été très productif !">
					<ULandingGrid>
						<ULandingCard
							v-for="(card, index) of modules"
							:key="index"
							v-bind="card"/>
					</ULandingGrid>
				</ULandingSection>
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>

<style lang="scss" scoped>

</style>
