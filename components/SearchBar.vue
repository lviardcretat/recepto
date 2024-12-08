<template>
  <div class="searchBar">
	<UInput
		:trailing="false"
		icon="material-symbols:search"
		color="white"
		placeholder="Search a recipe ..."
		size="xl"
		v-model="searchValue"
		@update:model-value="test"
	/>
  </div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	const searchValue = ref<string>('');

	const test = (newSearch: string) => {
		console.log(newSearch);
		alert("TEST");
	};
</script>

<style lang="scss">

</style>
