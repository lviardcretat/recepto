<script lang="ts" setup>
import { useFiltersStore } from '@/stores/filters';
import type { SelectItem } from '~/global/types';

defineProps<{
	items: SelectItem[];
	placeholder: string;
	disabled: boolean;
}>();
const itemsSelected = ref<SelectItem[]>([]);
const store = useFiltersStore();
</script>

<template>
  	<div>
		<div class="mb-2 flex-1 flex-wrap h-auto">
			<UBadge v-for="item in items.filter(item => item.wanted || item.notWanted)" class="h-6 m-0.5"
				:color="item.wanted ? 'green' : 'red'"
				variant="solid"
				size="sm"
				:ui="{ rounded: 'rounded-full' }">{{item.name}}</UBadge>
		</div>
		<USelectMenu
			:disabled="disabled"
			v-model="itemsSelected"
			:options="items"
			multiple
			:placeholder="$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })"
			searchable
			option-attribute="name"
			:searchable-placeholder="$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })"
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
				<span v-if="itemsSelected.length">{{
					$t('selected', items.filter(item => item.notWanted || item.wanted).length, { count: items.filter(item => item.notWanted || item.wanted).length })
				}}</span>
     			<span v-else>{{$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })}}</span>
			</template>
			<template #option="{ option: item }">
				<UButton
					:padded="false"
					variant="link"
					icon="material-symbols:circle-outline"
					:class="items[item.id - 1].wanted ? 'opacity-100' : 'opacity-20'"
					@click="
						items[item.id - 1].wanted = !items[item.id - 1].wanted;
						items[item.id - 1].notWanted = false;
						store.updateSelectLists(item.id, items[item.id- 1].wanted ? true : items[item.id- 1].notWanted ? false : null, item.type);
					"/>
				<UButton
					:padded="false"
					variant="link"
					icon="radix-icons:value-none"
					:class="items[item.id - 1].notWanted ? 'opacity-100' : 'opacity-20'"
					@click="
						items[item.id - 1].notWanted = !items[item.id - 1].notWanted;
						items[item.id - 1].wanted = false;
						store.updateSelectLists(item.id, items[item.id - 1].notWanted ? false : items[item.id - 1].wanted ? true : null, item.type);
					"/>
				<span class="truncate">{{ item.name }}</span>
			</template>
		</USelectMenu>
  	</div>
</template>

<style lang="scss">

</style>
