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
		content: 'w-48'
		}"
		:content="{
			align: 'end',
			side: 'top',
			sideOffset: 2
    	}">
		<UButton color="primary" size="xl" class="rounded-full"
			variant="solid" icon="material-symbols:add"></UButton>

		<template #content>
			<UButtonGroup size="xl" orientation="vertical">
				<UDropdownMenu :items="items">
					<template #item>
						<UButton v-for="item in items" color="primary" size="xl"
							variant="solid" :icon="item.icon"
							@click="isModalOpen = true; mainModalName = item.label!">{{ $t(item.label!) }}</UButton>
					</template>
				</UDropdownMenu>
			</UButtonGroup>
		</template>
	</UDropdownMenu>
	<UModal v-model:open="isModalOpen" :dismissible="false" :class="mainModalName === 'recipe' ? 'sm:max-w-6xl' : 'sm:max-w-4xl'">
		<template #content>
			<UCard>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
							{{ $t(`formCreation.${items.find((item) => item.label === mainModalName)?.modalNameTrad ?? ''}`, { element: $t(mainModalName).toLowerCase() }) }}
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
