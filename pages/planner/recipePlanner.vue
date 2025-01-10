<script lang="ts" setup>
import Planner from '~/components/Planner.vue';

	definePageMeta({
		layout: 'main',
	});
</script>

<template>
	<UDashboardPage class="recipePlanner h-full w-full">
		<Planner/>
	</UDashboardPage>
</template>

<style lang="scss">
</style>
