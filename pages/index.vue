<script lang="ts" setup>

</script>

<template>
	<UDashboardPage class="homepage h-full w-full">
		<SearchBar
		/>
	</UDashboardPage>
</template>

<style lang="scss">
	.homepage {
		display: flex;
		flex-direction: column;
		padding: 2rem;

		justify-content: center;
		align-items: center;

		> .searchBar {
			width: 75%;
		}
	}
</style>
