<script setup lang="ts">
const counts: Ref<number[][]> = ref([
	[0, 15],
	[0, 67],
	[0, 100],
	[0, 19],
	[0, 21],
]);
const duration = 1000;

const animateCounter = () => {
	const startTime = performance.now();

	const updateCounter = (currentTime: number) => {
		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1);

		for (let count of counts.value) {
			count[0] = Math.floor(progress * (count[1] ?? 1));
		}

		if (progress < 1) {
			requestAnimationFrame(updateCounter);
		}
	};

	requestAnimationFrame(updateCounter);
};

onMounted(animateCounter);

const cards = [
	{
		name: 'recipesCreated',
		icon: 'fluent:food-48-filled',
		value: counts.value[0],
		finalValue: 67,
	},
	{
		name: 'categoriesCreated',
		icon: 'tabler:category-filled',
		value: counts.value[1],
		finalValue: 15,
	},
	{
		name: 'strokesPerformed',
		icon: 'material-symbols:shopping-cart-rounded',
		value: counts.value[2],
		finalValue: 19,
	},
	{
		name: 'plannedMeals',
		icon: 'material-symbols:calendar-clock-outline-sharp',
		value: counts.value[3],
		finalValue: 21,
	},
	{
		name: 'registeredMembersThanks',
		icon: 'ri:hand-heart-fill',
		value: counts.value[4],
		finalValue: 100,
	},
];
</script>

<template>
	<UContainer class="w-full h-full flex flex-col items-center justify-center">
		<h1 class="text-4xl font-bold self-stretch flex items-center justify-center h-1/4">Vous avez été très performant !</h1>
		<div class="gap-10 w-full flex justify-evenly flex-wrap h-3/4">
			<UCard v-for="card in cards" class="w-1/4 h-1/3">
				<template #header>
					<div class="flex justify-between flex-col items-center gap-4 h-3/5">
						<UIcon class="text-4xl" :name="card.icon" />
						<div class="text-center">{{ $t(card.name) }}</div>
					</div>
				</template>
				<div class="flex justify-between flex-col items-center h-full">
					<h1 class="h-full text-4xl">{{ card.value[0] }}</h1>
				</div>
			</UCard>
		</div>
	</UContainer>
</template>

<style lang="scss" scoped>
span {
  transition: transform 0.2s ease-in-out;
}
</style>
