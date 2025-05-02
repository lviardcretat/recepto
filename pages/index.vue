<script lang="ts" setup>
async function uploadWithPresignedUrl(file: File) {
	const { url } = await $fetch(`/api/blob/sign/${file.name}`);
	await $fetch(url, {
		method: 'PUT',
		body: file,
	});
}
</script>

<template>
	<div class="m-auto w-1/2 flex flex-col">
		<input type="file" @change="uploadWithPresignedUrl($event.target.files[0])">
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
