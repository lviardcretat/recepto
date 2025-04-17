<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const items: DropdownMenuItem[] = [
	{
		label: 'ingredient',
		modalNameTrad: 'modalName_male',
		icon: 'fluent:food-carrot-24-filled',
	},
	{
		label: 'recipe',
		modalNameTrad: 'modalName_female',
		icon: 'material-symbols:fastfood',
	},
	{
		label: 'category',
		modalNameTrad: 'modalName_female',
		icon: 'tabler:category-filled',
	},
	{
		label: 'ustensil',
		modalNameTrad: 'modalName_male',
		icon: 'solar:ladle-bold',
	},
];
const mainModalName: Ref<string> = ref('');
const isModalOpen = ref(false);
</script>

<template>
	<UDropdownMenu class="absolute bottom-10 right-10" :items="items" size="xl"
		:ui="{
			content: 'w-48',
			item: 'p-0'
		}"
		:content="{
			align: 'end',
			side: 'top',
			sideOffset: 16
    	}">
		<UButton color="primary" size="xl" class="rounded-full"
			variant="solid" icon="material-symbols:add"></UButton>

		<template #item="{ item }">
			<UButton size="xl" class="flex justify-center w-full pl-6 pr-6" :icon="item.icon" variant="ghost"
				@click="isModalOpen = true; mainModalName = item.label!">
				<div class="grow-1 text-left ml-4">{{ $t(item.label!) }}</div></UButton>
		</template>
	</UDropdownMenu>
	<UModal v-model:open="isModalOpen" :dismissible="false" :class="mainModalName === 'recipe' ? 'sm:max-w-6xl' : 'sm:max-w-4xl'">
		<template #content>
			<UCard>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
							{{ $t(`formCreation.${items.find((item: DropdownMenuItem) => item.label === mainModalName)?.modalNameTrad ?? ''}`, { element: $t(mainModalName).toLowerCase() }) }}
						</h3>
						<UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
					</div>
				</template>

				<CreationUstensilModal v-if="mainModalName === 'ustensil'" @closeModal="isModalOpen = false"/>
				<CreationIngredientModal v-if="mainModalName === 'ingredient'" @closeModal="isModalOpen = false"/>
				<CreationRecipesCategoryModal v-if="mainModalName === 'category'" @closeModal="isModalOpen = false"/>
				<CreationRecipeModal v-if="mainModalName === 'recipe'" @closeModal="isModalOpen = false"/>
			</UCard>
		</template>
	</UModal>
</template>

<style lang="scss" scoped>

</style>
