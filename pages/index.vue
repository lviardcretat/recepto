<script lang="ts" setup>
</script>

<template>
	<UDashboardPage class="homepage h-full w-full">
		<UDashboardPanel grow>
			<UDashboardNavbar :title="$t('recipes')">
				<template #right>
					<TranslationSelect></TranslationSelect>
					<UColorModeToggle />
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent class="searchPanelContent">
				<RecipeSearchBar/>
				<div class="allRecipes">
					<label>
						{{ $t('inspiration') }}
					</label>
					<ULink class="moreRecipes"
						:to="{
						   name: 'recipes-all'
						}"
					>
						{{ $t('here') }}
					</ULink>
				</div>
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

			> .allRecipes {
				display: flex;
				flex-direction: row;
				column-gap: 0.5rem;

				> .moreRecipes {
					font-weight: bold;
				}

				> .moreRecipes:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
