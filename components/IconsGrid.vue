<script lang="ts" setup>
import type { IconsGridItem } from '~/global/types';

defineProps<{ items: IconsGridItem[] }>();
const store = useFiltersStore();
</script>

<template>
	<div class="grid grid-cols-3 grid-rows-2 gap-2 justify-items-center">
		<UTooltip v-for="item in items" :text="item.label" :delay-duration="0" :content="{ side: 'top' }"
			class="w-6 h-6 ml-4 mr-4 mt-2 mb-2 flex items-center justify-center">
			<UButton
				:icon="item.icon"
				color="neutral"
				variant="ghost"
				:class="items[item.id - 1].active ? 'opacity-100' : 'opacity-20'"
				@click="
					items[item.id - 1].active = !items[item.id - 1].active;
					store.updateGridLists(items[item.id - 1].id, items[item.id - 1].active, items[item.id - 1].dataType);
				"/>
		</UTooltip>
	</div>
</template>

<style lang="scss" scoped>

</style>
