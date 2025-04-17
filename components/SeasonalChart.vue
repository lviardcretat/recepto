<script setup lang="ts">
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
	//if (datasetsFetch.value) data = { datasets: datasetsFetch.value };
});

const {
	data: datasetsFetch,
	refresh,
	execute,
} = await useFetch('/api/ingredients/seasonals', {
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

type RevenueDataItem = {
	month: string;
	desktop: number;
	mobile: number;
};

const RevenueData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const RevenueCategories = {
	desktop: { name: 'Desktop' },
};

const xFormatter = (i: number): string => `${RevenueData[i]?.month}`;
const yFormatter = (i: number) => i;
</script>

<template>
	<UModal title="Calendrier de saison" v-model:open="isModalOpen" class="z-10">
		<template #body>
			<UCard>
				<div class="relative flex-1 overflow-y-auto h-[70vh] p-4" id="container">
					<div id="chartContainer">
						<BarChart
							:data="RevenueData"
							:height="275"
							:categories="RevenueCategories"
							:y-axis="['desktop']"
							:xNumTicks="6"
							:radius="4"
							:y-grid-line="false"
							:x-formatter="xFormatter"
							:y-formatter="yFormatter"
							:legend-position="LegendPosition.Top"
						/>
					</div>
				</div>
			</UCard>
		</template>
	</UModal>
</template>

<style lang="scss">
</style>
