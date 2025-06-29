<template>
<UDashboardGroup>
	<UDashboardPanel>
		<template #header>
			<UDashboardNavbar>
				<template #left>
					<h1 class="font-bold">Recepto</h1>
				</template>
			</UDashboardNavbar>
		</template>
		<template #body>
			<slot />
		</template>
	</UDashboardPanel>
</UDashboardGroup>
</template>

<script lang="ts" setup>
</script>

<style>
</style>
