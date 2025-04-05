<script lang="ts" setup>
</script>

<template>
	<div class="m-auto w-1/2 flex flex-col">
		<RecipeSearchBar/>
		<UButton icon="ri:bowl-fill" trailing-icon="i-lucide-arrow-right"
			color="primary" variant="ghost" size="xl" class="mt-3 ml-auto mr-auto"
			:to="{
				name: 'recipes-all'
			}">
			{{ $t('recipeAll') }}
		</UButton>
	</div>
</template>
