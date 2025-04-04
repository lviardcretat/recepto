<script setup lang="ts">
import {
	Chart,
	type ChartOptions,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	type ChartData,
	type ChartDataset,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Months } from '~/global/enums';

Chart.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	ChartDataLabels,
);

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
	if (datasetsFetch.value) data = { datasets: datasetsFetch.value };
});

const {
	data: datasetsFetch,
	refresh,
	execute,
} = await useFetch<
	ChartDataset<'bar', { name: string; months: number[]; type: string }[]>[]
>('/api/ingredients/seasonals', {
	method: 'GET',
	immediate: false,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

await execute();

const chartOptions: ChartOptions<'bar'> = {
	maintainAspectRatio: false,
	indexAxis: 'y',
	plugins: {
		tooltip: {
			enabled: true,
			xAlign: 'center',
			yAlign: 'center',
			callbacks: {
				title: () => '',
				label: (context) => {
					const range: number[] = (
						context.raw as { name: string; months: number[]; type: string }
					).months;
					const startMonth: string = Object.values(Months)[range[0]];
					const endMonth: string = Object.values(Months)[range[1] - 1];
					if (startMonth === endMonth) {
						return startMonth;
					}
					return t('fromTo', { from: t(startMonth), to: t(endMonth) });
				},
			},
		},
		legend: {
			display: true,
			position: 'top',
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			stacked: true,
			ticks: {
				stepSize: 1,
				autoSkip: false,
			},
		},
		x: {
			position: 'top',
			stacked: true,
			ticks: {
				callback: (index) =>
					Object.values(Months)[Number(index)]
						? t(Object.values(Months)[Number(index)])
						: '',
				stepSize: 1,
				autoSkip: false,
			},
		},
	},
};

let data: ChartData<'bar'> = {
	datasets: datasetsFetch.value,
};
</script>

<template>
	<UModal title="Calendrier de saison" v-model:open="isModalOpen" class="z-10">
		<template #body>
			<UCard>
				<div class="relative flex-1 overflow-y-auto h-[70vh] p-4" id="container">
					<div id="chartContainer">
						<Bar :data="data" :items="chartOptions"/>
					</div>
				</div>
			</UCard>
		</template>
	</UModal>
</template>

<style lang="scss">
</style>
