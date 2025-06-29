<script lang="ts" setup>
import type { InputMenuItem } from '@nuxt/ui';
import type { RecipeSearched } from '~/types/search';

const searchValue = ref<string>('');
const { data, execute, clear } = useFetch('/api/recipesCategories/search', {
	method: 'GET',
	query: {
		name: searchValue,
	},
	immediate: false,
	default: () => [],
	watch: false,
	transform: (recipes: RecipeSearched[]): InputMenuItem[] => {
		return recipes.map((recipe): InputMenuItem => {
			return {
				label: recipe.label,
				type: (recipe.type as 'label' | 'item') ?? 'item',
			};
		});
	},
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

await execute();

watch(searchValue, async (newValue) => {
	if (newValue.trim().length > 0) {
		await execute();
	} else {
		clear();
	}
});
</script>

<template>
	<UInputMenu v-model:search-term="searchValue" :items="data"
		trailing-icon="material-symbols:search" size="xl" class="w-full"
		:placeholder="$t('findRecipe')" value-key="id" />
</template>
