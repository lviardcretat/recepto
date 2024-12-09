<script lang="ts" setup>
import type { IconsGridItem } from './RecipeFilter.vue';

defineProps<{ items: IconsGridItem[] }>();
</script>

<template>
	<div class="grid grid-cols-3 grid-rows-2 gap-2 justify-items-center">
		<UTooltip v-for="item in items" :text="item.name" :popper="{ placement: 'top' }"
			class="w-6 h-6 ml-4 mr-4 mt-2 mb-2 flex items-center justify-center">
			<UButton
				:icon="item.icon"
				color="white"
				variant="ghost"
				class="opacity-40"
			/>
		</UTooltip>
	</div>
</template>

<style lang="scss" scoped>

</style>
