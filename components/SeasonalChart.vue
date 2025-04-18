<script setup lang="ts">
import type { DataRecord } from '~/server/api/ingredients/seasonals.get';
import {
	VisXYContainer,
	VisAxis,
	VisTimeline,
	VisBulletLegend,
	VisTooltip,
} from '@unovis/vue';
import { colors, Timeline, type BulletLegendItemInterface } from '@unovis/ts';
import { Months } from '~/global/enums';

const { t } = useI18n();
const isModalOpen = ref<boolean>(false);
defineShortcuts({
	shift_s: {
		usingInput: true,
		handler: () => {
			isModalOpen.value = !isModalOpen.value;
		},
	},
});

useListen('ingredient:created', async () => {
	await refresh();
});

const {
	data: datasetsFetch,
	refresh,
	execute,
} = await useFetch<DataRecord[]>('/api/ingredients/seasonals', {
	method: 'GET',
	immediate: false,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

const { data: foodTypes } = await useFetch('/api/foodTypes/all', {
	method: 'GET',
	watch: false,
	default: () => null,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

const x = (d: DataRecord) => d.startMonth;
const length = (d: DataRecord) => {
	return d.endMonth - d.startMonth > 0 ? d.endMonth - d.startMonth : 1;
};
const type = (d: DataRecord) => d.name;
const color = (d: DataRecord) => colors[d.typeId];
await execute();
const legendItems: BulletLegendItemInterface[] =
	foodTypes.value?.slice(0, 2).map((foodType) => ({
		name: foodType.name,
		color: colors[foodType.id],
	})) ?? [];
const triggers = {
	[Timeline.selectors.line]: (d: DataRecord) => {
		const startMonth: string = Object.values(Months)[d.startMonth];
		const endMonth: string = Object.values(Months)[d.endMonth - 1];
		if (startMonth === endMonth) {
			return t(startMonth);
		}
		return t('fromTo', { from: t(startMonth), to: t(endMonth) });
	},
};
const tickFormat = (tick: number) => {
	return t(Object.values(Months)[tick]);
};
</script>

<template>
	<UModal title="Calendrier de saison" v-model:open="isModalOpen" class="z-10 max-w-7xl">
		<template #body>
			<div class="m-9 customTimeline">
				<VisXYContainer :data="datasetsFetch" :height="500" :xDomain="[0,12]">
					<VisBulletLegend :items="legendItems" class="flex! justify-center mb-6"/>
					<VisTimeline :x="x" :length="length" :type="type" :showLabels="true" :color="color" :lineCap="true"/>
					<VisAxis type="x" :tickValues="[0,1,2,3,4,5,6,7,8,9,10,11]" :tickFormat="tickFormat" :domainLine="false"/>
					<VisTooltip :triggers="triggers" />
				</VisXYContainer>
			</div>
		</template>
	</UModal>
</template>

<style lang="scss">
.customTimeline {
	--vis-timeline-row-even-fill-color: var(--ui-bg);
	--vis-timeline-row-odd-fill-color: var(--ui-bg);
	--vis-timeline-scrollbar-background-color: var(--ui-bg);
	--vis-timeline-scrollbar-color: var(--ui-text);
	--vis-timeline-label-color: var(--ui-text);

	--vis-axis-tick-label-color: var(--ui-text);

	--vis-legend-label-color: var(--ui-text);

	--vis-tooltip-background-color: var(--ui-bg);
	--vis-tooltip-border-color: var(--ui-border);
	--vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
