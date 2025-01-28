<script setup lang="ts">
const test = useTest();
</script>

<template>
	<UDashboardPage class="h-full">
		<MainSlideover></MainSlideover>
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
			<UDashboardPanelContent class="flex flex-col justify-center">
				<SeasonalChart/>
				<UContainer class="w-full flex flex-col items-center">
					<h1 class="text-4xl font-bold">Vous avez été très performant !</h1>
					<div class="grid grid-cols-12 grid-rows-2 gap-4 w-full">
						<UCard class="col-span-4 row-span-2">
							<div class="flex justify-between">
								<h1 class="text-7xl">50</h1>
								<div>repas prévus !</div>
							</div>
						</UCard>
						<UCard class="col-span-4 row-span-1">
							<h1>35</h1>
							<div>recettes créés !</div>
						</UCard>
						<UCard class="col-span-4 row-span-1">
							<h1>16</h1>
							<div>catégories créés !</div>
						</UCard>
						<UCard class="col-span-8 row-span-1">
							<h1>2</h1>
							<div>courses effectués !</div>
						</UCard>
						<UCard class="col-span-12 row-span-1">
							<h1>106</h1>
							<div>membres inscrits grâce à vous !</div>
						</UCard>
					</div>
				</UContainer>
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>

<style lang="scss" scoped>

</style>
