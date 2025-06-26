
<script setup lang="ts">
const props = defineProps<{
	name: string;
	description: string | null | undefined;
	peopleNumber: number;
	preparationTime: number;
	cookingTime: number;
	restTime: number;
	createdAt: Date;
	fullName: string;
}>();
</script>

<template>
	<UCard class="recipeCard flex flex-col" variant="soft" :ui="{header: 'flex flex-col gap-4'}">
		<template #header>
			<h1 class="text-3xl text-center">{{ props.name }}</h1>
			<img src="~/assets/img/lasagnes.jpg" />
		</template>
        <div class="data">
			<div class="icons flex justify-around items-center">
				<div class="peopleNumber flex justify-around items-center gap-1">
					<UIcon name="ic:baseline-people-alt"/>
					<span class="value">{{ props.peopleNumber }}</span>
				</div>
				<div class="preparationTime flex justify-around items-center gap-1">
					<UIcon name="mdi:knife"/>
					<span class="value">{{ formatDurationUtils(props.preparationTime)}}</span>
				</div>
				<div class="cookingTime flex justify-around items-center gap-1">
					<UIcon name="material-symbols:oven-outline-rounded"/>
					<span class="value">{{ formatDurationUtils(props.cookingTime) }}</span>
				</div>
				<div class="restTime flex justify-around items-center gap-1">
					<UIcon name="mdi:sleep"/>
					<span class="value">{{ formatDurationUtils(props.restTime) }}</span>
				</div>
			</div>
            <p class="mt-3 ellipsis h-20">{{ props.description }}</p>
        </div>
		<template #footer>
			<div class="footer flex justify-between items-center">
				<p>{{ $t('createdBy', { username: props.fullName })}}</p>
				<p>{{ $d(props.createdAt, 'short') }}</p>
			</div>
		</template>
	</UCard>
</template>

<style lang="scss">
.recipeCard {
	.ellipsis {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		height: auto;
	}
}
</style>
