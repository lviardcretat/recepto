<script lang="ts" setup>
export type Ingredients = {
	id: number;
	name: string;
	wanted: boolean;
	notWanted: boolean;
};

const props = defineProps<{
	ingredients: Ingredients[];
}>();
</script>

<template>
  	<div>
		<div>
			<UBadge v-for="ingredient in props.ingredients.filter(ingredient => ingredient.wanted || ingredient.notWanted)"
				:color="ingredient.wanted ? 'green' : 'red'"
				variant="solid"
				size="sm"
				:ui="{ rounded: 'rounded-full' }">{{ingredient.name}}</UBadge>
		</div>
		<USelectMenu
		:options="props.ingredients"
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
			<template #option="{ option: ingredient }">
				<UButton
					:padded="false"
					variant="link"
					icon="material-symbols:circle-outline"
					:class="props.ingredients[ingredient.id - 1].wanted ? 'opacity-100' : 'opacity-20'"
					@click="props.ingredients[ingredient.id - 1].wanted = !props.ingredients[ingredient.id - 1].wanted; props.ingredients[ingredient.id - 1].notWanted = false;"/>
				<UButton
					:padded="false"
					variant="link"
					icon="radix-icons:value-none"
					:class="props.ingredients[ingredient.id - 1].notWanted ? 'opacity-100' : 'opacity-20'"
					@click="props.ingredients[ingredient.id - 1].notWanted = !props.ingredients[ingredient.id - 1].notWanted; props.ingredients[ingredient.id - 1].wanted = false;"/>
				<span class="truncate">{{ ingredient.name }}</span>
			</template>
		</USelectMenu>
  	</div>
</template>

<style>

</style>
