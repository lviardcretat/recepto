<script setup lang="ts">
const { data: recipeCategories } = await useFetch('/api/recipesCategories/all');
const test = useTest();
</script>

<template>
	<UDashboardPage>
		<MainSlideover></MainSlideover>
		<RecipeFilter/>
		<UDashboardPanel grow>
			<UDashboardNavbar title="Recettes">
				<template #right>
					<UColorModeToggle />
					<UButton
						:padded="false"
						variant="link"
						icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
						@click="test = !test"/>
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent>
				<NuxtLink v-for="recipeCategory in recipeCategories" :to="{ name: 'recipes-id', params: { id: recipeCategory.id }}">
					<UDashboardCard :title="recipeCategory.name">
					</UDashboardCard>
				</NuxtLink>
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
