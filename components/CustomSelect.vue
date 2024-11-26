<script lang="ts" setup>
import { useFiltersStore } from '@/stores/filters';
export type Item = {
	id: number;
	name: string;
	wanted: boolean;
	notWanted: boolean;
};

const props = defineProps<{
	items: Item[];
}>();

const store = useFiltersStore();
</script>

<template>
  	<div>
		<div>
			<UBadge v-for="item in props.items.filter(item => item.wanted || item.notWanted)"
				:color="item.wanted ? 'green' : 'red'"
				variant="solid"
				size="sm"
				:ui="{ rounded: 'rounded-full' }">{{item.name}}</UBadge>
		</div>
		<USelectMenu
		:options="props.items"
		multiple
		placeholder="Select people"
		searchable
		searchable-placeholder="Search a person..."
		selected-icon=""
		:uiMenu="{
			strategy: 'override',
			option: {
				base: 'cursor-default select-none relative flex items-center justify-between gap-1',
				container: 'flex items-center gap-1.5 min-w-0 w-full',
				active: 'bg-emerald-700 dark:bg-emerald-700',
				selected: 'pe-7',
			}
		}">
			<template #label>
				<span>Select people</span>
			</template>
			<template #option="{ option: item }">
				<UButton
					:padded="false"
					variant="link"
					icon="material-symbols:circle-outline"
					:class="props.items[item.id - 1].wanted ? 'opacity-100' : 'opacity-20'"
					@click="
						props.items[item.id - 1].wanted = !props.items[item.id - 1].wanted;
						props.items[item.id - 1].notWanted = false;
						store.updateLists(item.id, props.items[item.id- 1].wanted ? true : props.items[item.id- 1].notWanted ? false : null, DataType.Ustensil);
					"/>
				<UButton
					:padded="false"
					variant="link"
					icon="radix-icons:value-none"
					:class="props.items[item.id - 1].notWanted ? 'opacity-100' : 'opacity-20'"
					@click="
						props.items[item.id - 1].notWanted = !props.items[item.id - 1].notWanted;
						props.items[item.id - 1].wanted = false;
						store.updateLists(item.id, props.items[item.id - 1].notWanted ? false : props.items[item.id - 1].wanted ? true : null, DataType.Ustensil);
					"/>
				<span class="truncate">{{ item.name }}</span>
			</template>
		</USelectMenu>
  	</div>
</template>

<style>

</style>
