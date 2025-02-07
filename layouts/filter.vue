<script setup lang="ts">
const test = useTest();
/*const route = useRoute();

const { data, execute } = await useFetch<string>(
	`/api/recipesCategories/recipes/${route.params.id}`,
	{
		method: 'GET',
		watch: false,
		immediate: false,
		default: () => '',
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	},
);

const breadcrumbLinks = computed(() => {
	const pathSegments = route.path.split('/').filter(Boolean);
	let accumulatedPath = '';



	return [
		{ label: 'Accueil', to: '/' },
		...pathSegments
			.map((segment, index) => {
				accumulatedPath += `/${segment}`;

				if(Number.isInteger(segment)) {
					await execute();
					return
				}

				if (segment === 'recipes') return null;
				if (segment === 'user') return { label: 'Utilisateur' };

				return {
					label: isDynamic ? 'Détail' : decodeURIComponent(segment),
					to: index === pathSegments.length - 1 ? null : accumulatedPath,
				};
			})
			.filter(Boolean),
	];
});*/
</script>

<template>
	<UDashboardPage class="h-full">
		<MainSlideover></MainSlideover>
		<RecipeFilter/>
		<UDashboardPanel grow>
			<UDashboardNavbar>
				<template #left>
					<h1 class="font-bold">{{ $t('recipe', 2) }}</h1>
				</template>
				<template #right>
					<div class="flex justify-end gap-3">
						<TranslationSelect></TranslationSelect>
						<UColorModeButton />
						<UButton
							variant="link"
							icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
							@click="test = !test"/>
					</div>
				</template>
			</UDashboardNavbar>
			<UDashboardToolbar>
				<template #left>
					<UBreadcrumb :links="[]" />
				</template>
			</UDashboardToolbar>
			<UDashboardPanelContent>
				<slot />
			</UDashboardPanelContent>
		</UDashboardPanel>
		<CreationButton/>
	</UDashboardPage>
</template>
