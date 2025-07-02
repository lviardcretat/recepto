<script lang="ts" setup>
</script>

<template>
	<UHeader>
		<template #title>
		<NuxtImg src="icon.dzqdzq" />
		</template>

		<template #right>
			<TranslationSelectComponent />
			<UColorModeButton />
			<UButton
				icon="i-simple-icons-github"
				color="neutral"
				variant="ghost"
				to="https://github.com/lviardcretat/recepto"
				target="_blank"
				aria-label="GitHub"
			/>
		</template>
  	</UHeader>
	<slot />
	<USeparator icon="i-logos-nuxt-icon" class="h-px" />
	<UFooter>
		<template #left>
			<p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
		</template>

		<template #right>
		<UButton
			icon="i-simple-icons-nuxtdotjs"
			color="neutral"
			variant="ghost"
			to="https://nuxt.com"
			target="_blank"
			aria-label="NuxtJS"
		/>
		<UButton
			icon="i-simple-icons-github"
			color="neutral"
			variant="ghost"
			to="https://github.com/lviardcretat/recepto"
			target="_blank"
			aria-label="GitHub"
		/>
		</template>
  	</UFooter>
</template>

<style>
</style>
