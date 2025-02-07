<script lang="ts" setup>
const items = [
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
const isPopoverOpen: Ref<boolean> = ref(false);
const isModalOpen: Ref<boolean> = ref(false);
const mainModalName: Ref<string> = ref('');
</script>

<template>
	<UPopover v-model:open="isPopoverOpen" :popper="{ placement: 'top-end' }" class="absolute bottom-10 right-10">
		<UButton color="primary" size="xl" :ui="{ rounded: 'rounded-full' }"
			variant="solid" icon="material-symbols:add"></UButton>

		<template #panel>
			<UButtonGroup size="xl" orientation="vertical">
				<UButton v-for="item in items" color="primary" size="xl"
					variant="solid" :icon="item.icon"
					@click="isPopoverOpen = false; isModalOpen = true; mainModalName = item.label">{{ $t(item.label) }}</UButton>
			</UButtonGroup>
		</template>
	</UPopover>
	<UModal v-model="isModalOpen" prevent-close :ui="{
			width: mainModalName === 'recipe' ? 'sm:max-w-6xl' : 'sm:max-w-4xl'
		}">
		<UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
						{{ $t(`formCreation.${items.find((item) => item.label === mainModalName)?.modalNameTrad ?? ''}`, { element: $t(mainModalName).toLowerCase() }) }}
					</h3>
					<UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
				</div>
			</template>

			<CreationUstensilModal v-if="mainModalName === 'ustensil'" @closeModal="isModalOpen = false"/>
			<CreationIngredientModal v-if="mainModalName === 'ingredient'" @closeModal="isModalOpen = false"/>
			<CreationRecipesCategoryModal v-if="mainModalName === 'category'" @closeModal="isModalOpen = false"/>
			<CreationRecipeModal v-if="mainModalName === 'recipe'" @closeModal="isModalOpen = false"/>
		</UCard>
	</UModal>
</template>

<style lang="scss" scoped>

</style>
