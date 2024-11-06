<script setup lang="ts">
const ingredients = await mapObjects('ingredients');
const ustensils = await mapObjects('ustensils');
console.log(ustensils);

async function mapObjects(name: string) {
	const { data: objects } = await useFetch(`/api/${name}/all`, {
		transform: (objects) => {
			return objects.map((object) => ({
				id: object.id,
				name: object.name,
				wanted: false,
				notWanted: false,
			}));
		},
	});
	return objects;
}
</script>

<template>
	<UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
		<UDashboardNavbar title="Filtres">
			<template #right>
				<UIcon name="material-symbols:filter-alt" class="w-7 h-7" />
        	</template>
		</UDashboardNavbar>
		<UDashboardSidebar>
			<CustomSelect :items="ingredients ?? []" />
			<CustomSelect :items="ustensils ?? []" />
		</UDashboardSidebar>
	</UDashboardPanel>
</template>

<style lang="scss">

</style>
