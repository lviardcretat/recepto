<script setup lang="ts">
const test = useTest();
</script>

<template>
	<UDashboardPage class="h-full">
		<MainSlideover></MainSlideover>
		<RecipeFilter/>
		<UDashboardPanel grow>
			<UDashboardNavbar :title="$t('recipes')">
				<template #right>
					<TranslationSelect></TranslationSelect>
					<UColorModeButton />
					<UButton
						:padded="false"
						variant="link"
						icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
						@click="test = !test"/>
				</template>
			</UDashboardNavbar>
			<UDashboardPanelContent>
				<slot />
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>
