<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const { t } = useI18n();
const mainModalName: Ref<string> = ref('');
const isModalOpen = ref(false);
const items = computed(
	() =>
		[
			{
				label: t('ingredient'),
				icon: 'fluent:food-carrot-24-filled',
				onSelect: () => {
					isModalOpen.value = true;
					mainModalName.value = 'ingredient';
				},
			},
			{
				label: t('recipe'),
				icon: 'material-symbols:fastfood',
				onSelect: () => {
					isModalOpen.value = true;
					mainModalName.value = 'recipe';
				},
			},
			{
				label: t('category'),
				icon: 'tabler:category-filled',
				onSelect: () => {
					isModalOpen.value = true;
					mainModalName.value = 'category';
				},
			},
			{
				label: t('ustensil'),
				icon: 'solar:ladle-bold',
				onSelect: () => {
					isModalOpen.value = true;
					mainModalName.value = 'ustensil';
				},
			},
		] satisfies DropdownMenuItem,
);
</script>

<template>
	<UDropdownMenu class="absolute bottom-10 right-10 z-20" :items="items" size="xl"
		:content="{
			align: 'end',
			side: 'top',
			sideOffset: 16
    	}">
		<UButton color="primary" size="xl" class="rounded-full"  icon="material-symbols:add" />
	</UDropdownMenu>
	<UModal v-model:open="isModalOpen" :dismissible="false" :class="mainModalName === 'recipe' ? 'sm:max-w-6xl' : 'sm:max-w-4xl'">
		<template #content>
			<UCard>
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
							{{ $t(`formCreation.${mainModalName}.cardTitle`) }}
						</h3>
						<UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isModalOpen = false" />
					</div>
				</template>

				<CreationUstensilModalComponent v-if="mainModalName === 'ustensil'" @closeModal="isModalOpen = false"/>
				<CreationIngredientModalComponent v-if="mainModalName === 'ingredient'" @closeModal="isModalOpen = false"/>
				<CreationRecipesCategoryModalComponent v-if="mainModalName === 'category'" @closeModal="isModalOpen = false"/>
				<CreationRecipeModalComponent v-if="mainModalName === 'recipe'" @closeModal="isModalOpen = false"/>
			</UCard>
		</template>
	</UModal>
</template>

<style lang="scss" scoped>

</style>
