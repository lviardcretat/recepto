<script lang="ts" setup>
import { useFiltersStore } from '@/stores/filters';
import { DataType } from '~/global/enums';
import type { SelectItem } from '~/global/types';

const props = defineProps<{
	items: SelectItem[];
	placeholder: string;
	disabled: boolean;
}>();
const itemsSelected = ref<SelectItem[]>([]);
const store = useFiltersStore();

function getButtonsColor(
	selectMenuItem: SelectItem,
	buttonType: 'wanted' | 'notWanted',
) {
	const item: SelectItem | undefined = props.items.find(
		(item) => item.id === selectMenuItem.id,
	);
	const isWanted: boolean = buttonType === 'wanted';
	if (item?.notWanted) {
		return isWanted ? 'opacity-20' : 'opacity-100';
	}
	if (item?.wanted) {
		return isWanted ? 'opacity-100' : 'opacity-20';
	}
	return 'opacity-20';
}

function onButtonClick(
	selectMenuItem: SelectItem,
	buttonType: 'wanted' | 'notWanted',
) {
	const isWanted: boolean = buttonType === 'wanted';
	if (isWanted) {
		props.items[selectMenuItem.id - 1].wanted =
			!props.items[selectMenuItem.id - 1].wanted;
		props.items[selectMenuItem.id - 1].notWanted = false;
		store.updateSelectLists(
			selectMenuItem.id,
			props.items[selectMenuItem.id - 1].wanted
				? false
				: props.items[selectMenuItem.id - 1].notWanted
					? true
					: null,
			selectMenuItem.dataType,
		);
	} else {
		props.items[selectMenuItem.id - 1].notWanted =
			!props.items[selectMenuItem.id - 1].notWanted;
		props.items[selectMenuItem.id - 1].wanted = false;
		store.updateSelectLists(
			selectMenuItem.id,
			props.items[selectMenuItem.id - 1].notWanted
				? false
				: props.items[selectMenuItem.id - 1].wanted
					? true
					: null,
			selectMenuItem.dataType,
		);
	}
}
</script>

<template>
  	<div>
		<div class="mb-2 flex-1 flex-wrap h-auto">
			<UBadge v-for="item in items.filter(item => item.wanted || item.notWanted)" class="h-6 m-0.5"
				:color="item.wanted ? 'primary' : 'error'" size="md" variant="solid" :label="item.label"></UBadge>
		</div>
		<USelectMenu
			:disabled="disabled"
			:v-model="itemsSelected"
			value-key="id"
			:items="items"
			class="w-full"
			multiple
			:placeholder="$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })"
			searchable
			:searchable-placeholder="$t('filterBy', { filterName: placeholder.toLocaleLowerCase() })"
			:ui="{ itemTrailing: 'hidden' }">
			<template #item-leading="{ item }">
				<UButton
					:padded="false" variant="link" icon="material-symbols:circle-outline"
					:class="getButtonsColor(item, 'wanted')" @click="onButtonClick(item, 'wanted')"
					:ui="{
						base: 'p-0'
					}"/>
				<UButton
					:padded="false" variant="link" icon="radix-icons:value-none"
					:class="getButtonsColor(item, 'notWanted')" @click="onButtonClick(item, 'notWanted')"
					:ui="{
						base: 'p-0 pr-1.5'
					}"/>
			</template>
		</USelectMenu>
  	</div>
</template>

<style lang="scss">

</style>
