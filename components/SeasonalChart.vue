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
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { IngredientsSeasonal } from '~/global/types';

Chart.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	ChartDataLabels,
);

const foodTypeIdRef = ref<number>(1);
const isModalOpen = ref<boolean>(false);
const foodTypesValid: number[] = [1, 2];
defineShortcuts({
	shift_s: {
		usingInput: true,
		handler: () => {
			isModalOpen.value = !isModalOpen.value;
		},
	},
});
const { data, execute, clear } = await useFetch('/api/ingredients/seasonals', {
	method: 'GET',
	default: () => [],
	query: {
		foodTypeId: foodTypeIdRef,
	},
	immediate: false,
	watch: false,
	server: false,
	transform: (items: IngredientsSeasonal[]) => {
		return items.map((ingredient: IngredientsSeasonal) => ({
			y: ingredient.name,
			x: ingredient.seasonalMonths as number[][],
			type: ingredient.foodType.name,
		}));
	},
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

async function getIngredientsSeasonals(foodTypeId: number) {
	clear();
	foodTypeIdRef.value = foodTypeId;
	await execute();
}

async function generateDatasets() {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let datasets: any[] = [];
	let index = 0;
	let colors: string[] = ['#f87979', '#f56109'];
	if (!foodTypes.value) {
		return datasets;
	}
	for (let foodType of foodTypes.value) {
		if (foodTypesValid.includes(foodType.id)) {
			await getIngredientsSeasonals(foodType.id);
			datasets.push({
				label: foodType.name,
				backgroundColor: colors[index],
				datalabels: {
					display: false,
				},
				data: data.value.flatMap((item) =>
					item.x.length > 0
						? item.x.map((subArray) => ({
								y: item.y,
								x: subArray,
								type: item.type,
							}))
						: [
								{
									y: item.y,
									x: [],
									type: item.type,
								},
							],
				),
			});
			index += 1;
		}
	}
	return datasets;
}

const chartData = ref({
	datasets: await generateDatasets(),
});
const months: string[] = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Aout',
	'Septembre',
	'Octobre',
	'Novembre',
	'Decembre',
];

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
					const range: number[] = (context.raw as { y: string; x: number[] }).x;
					const startMonth: string = months[range[0]];
					const endMonth: string = months[range[1] - 1];
					if (startMonth === endMonth) {
						return startMonth;
					}
					return `De ${startMonth} à ${endMonth}`;
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
				callback: (index) => months[Number(index)],
				stepSize: 1,
				autoSkip: false,
			},
		},
	},
};
</script>

<template>
	<UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-4xl', height: 'h-[80vh]' }">
		<UCard>
			<template #header>
				<h1 class="h-8">Calendrier de saison</h1>
			</template>

			<div class="relative flex-1 overflow-y-auto h-[70vh] p-4" id="container">
				<div id="chartContainer">
					<Bar :data="chartData" :options="chartOptions"/>
				</div>
			</div>
		</UCard>
	</UModal>
</template>

<style lang="scss">
	#container {
		#chartContainer{
			height: 300%;
		}
	}
</style>
