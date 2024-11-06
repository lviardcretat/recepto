<script setup lang="ts">
const people = ref([
	{ id: 1, name: 'Wade Cooper', wanted: false, notWanted: false },
	{ id: 2, name: 'Arlene Mccoy', wanted: false, notWanted: false },
	{ id: 3, name: 'Devon Webb', wanted: false, notWanted: false },
	{ id: 4, name: 'Tom Cook', wanted: false, notWanted: false },
	{ id: 5, name: 'Tanya Fox', wanted: false, notWanted: false },
	{ id: 6, name: 'Hellen Schmidt', wanted: false, notWanted: false },
	{ id: 7, name: 'Caroline Schultz', wanted: false, notWanted: false },
	{ id: 8, name: 'Mason Heaney', wanted: false, notWanted: false },
	{ id: 9, name: 'Claudie Smitham', wanted: false, notWanted: false },
	{ id: 10, name: 'Emil Schaefer', wanted: false, notWanted: false },
]);
const { data: ingredients } = await useFetch('/api/ingredients/all', {
	transform: (ingredients) => {
		return ingredients.map((ingredient) => ({
			id: ingredient.id,
			name: ingredient.name,
			wanted: false,
			notWanted: false,
		}));
	},
});
</script>

<template>
	<UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
		<UDashboardNavbar title="Filtres">
			<template #right>
				<UIcon name="material-symbols:filter-alt" class="w-7 h-7" />
        	</template>
		</UDashboardNavbar>
		<UDashboardSidebar>
			<CustomSelect :ingredients="ingredients ?? []" />
		</UDashboardSidebar>
	</UDashboardPanel>
</template>

<style lang="scss">

</style>
