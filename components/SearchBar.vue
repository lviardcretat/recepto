<template>
  <div class="searchBar">
	<UInput
		:trailing="false"
		icon="material-symbols:search"
		color="white"
		placeholder="Search a recipe ..."
		size="xl"
		v-model="searchValue"
	/>
	<p>{{ searchValue }}</p>
	<p>{{ names }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

let searchValue = ref<string>('');
let names = ref();

const { data } = await useFetch('/api/recipesCategories/test', {
	query: {
		name: searchValue,
	},
	/* Changing the searchValue will trigger a refetch */
	watch: [searchValue],
	onResponse({ request, response, options }) {
		names = response._data;
	},
});
</script>

<style lang="scss">

</style>
