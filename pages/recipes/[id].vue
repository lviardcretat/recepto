<template>
	<UDashboardPage>
		<RecipeFilter/>
		<UDashboardPanel grow>
			<UDashboardNavbar title="Recettes alternatives">
				<template #right>
					<UColorModeToggle />
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent>
				<AlternativeRecipesSelection/>
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>

<style lang="scss">
	.recipe-content {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
</style>
