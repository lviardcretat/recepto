<script lang="ts" setup>
async function uploadWithPresignedUrl(event: Event) {
	const files = (event.target as HTMLInputElement)?.files;
	if (files) {
		const { url } = await $fetch(`/api/blob/sign/${files[0].name}`, {
			method: 'GET',
		});
		await $fetch(url, {
			method: 'PUT',
			body: files[0],
		});
	}
}
</script>

<template>
	<div class="m-auto w-1/2 flex flex-col">
		<RecipeSearchBarComponent/>
		<UButton icon="ri:bowl-fill" trailing-icon="i-lucide-arrow-right"
			color="primary" variant="ghost" size="xl" class="mt-3 ml-auto mr-auto"
			:to="{
				name: 'recipes-all'
			}">
			{{ $t('recipeAll') }}
		</UButton>
		<UInput type="file" @change="uploadWithPresignedUrl($event)"></UInput>
	</div>
</template>
