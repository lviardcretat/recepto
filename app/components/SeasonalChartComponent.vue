<script setup lang="ts">
import type { DataRecord } from '~~/server/api/ingredients/seasonals.get';
import {
	VisXYContainer,
	VisAxis,
	VisTimeline,
	VisBulletLegend,
	VisTooltip,
} from '@unovis/vue';
import { colors, Timeline, type BulletLegendItemInterface } from '@unovis/ts';
import { Months } from '~/enums/data';

const { t } = useI18n();

useListen('ingredient:created', async () => {
	await refreshDatasetsFetch();
});

const {
	data: datasetsFetch,
	refresh: refreshDatasetsFetch,
	execute: executeDatasetsFetch,
} = await useFetch<DataRecord[]>('/api/ingredients/seasonals', {
	method: 'GET',
	immediate: false,
	watch: false,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

const { data: foodTypesFetch, execute: executeFoodTypesFetch } = await useFetch(
	'/api/foodTypes/all',
	{
		method: 'GET',
		immediate: false,
		watch: false,
		default: () => null,
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	},
);

await executeDatasetsFetch();
await executeFoodTypesFetch();

const x = (d: DataRecord) => d.startMonth;
const length = (d: DataRecord) => {
	return d.endMonth - d.startMonth > 0 ? d.endMonth - d.startMonth : 1;
};
const type = (d: DataRecord) => d.name;
const color = (d: DataRecord) => colors[d.typeId];
const legendItems: BulletLegendItemInterface[] =
	foodTypesFetch.value?.slice(0, 2).map((foodType) => ({
		name: foodType.name,
		color: colors[foodType.id],
	})) ?? [];
const triggers = {
	[Timeline.selectors.line]: (d: DataRecord) => {
		const startMonth: string =
			Object.values(Months)[d.startMonth] ?? 'undefined';
		const endMonth: string =
			Object.values(Months)[d.endMonth - 1] ?? 'undefined';
		if (startMonth === endMonth) {
			return t(startMonth);
		}
		return t('fromTo', {
			from: t(`months.${startMonth}`),
			to: t(`months.${endMonth}`),
		});
	},
};
const tickFormat = (tick: number) => {
	return t(`months.${Object.values(Months)[tick]}`);
};
</script>

<template>
	<UModal :title="$t('seasonalChart.title')" class="z-10 max-w-7xl">
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
