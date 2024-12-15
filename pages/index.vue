<script lang="ts" setup>

</script>

<template>
	<UDashboardPage class="homepage h-full w-full">
		<UDashboardPanel grow>
			<UDashboardNavbar title="Recettes">
				<template #right>
					<UColorModeToggle />
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent class="searchPanelContent">
				<RecipeSearchBar/>
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>

<style lang="scss">
	:root {
	color-scheme: light dark;
	}
	.homepage {
		display: flex;
		flex-direction: column;

		.searchPanelContent {
			display: flex;
			flex-direction: column;
			padding: 2rem;

			justify-content: center;
			align-items: center;
			> .recipeSearchBar {
				width: 75%;
			}
		}
	}
</style>
