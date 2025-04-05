<script setup lang="ts">
import type { NuxtError } from '#app';

useSeoMeta({
	title: 'Page not found',
	description: 'We are sorry but this page could not be found.',
});

defineProps<{
	error: NuxtError;
}>();
</script>

<template>
  	<div>
		<UHeader />
		<UContainer>
			<UMain>
				<UPage>
					<Error :error="error" />
				</UPage>
			</UMain>
		</UContainer>
	</div>
</template>
