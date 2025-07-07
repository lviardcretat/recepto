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
  <UCard
    class="recipeCard flex flex-col"
    variant="soft"
    :ui="{ header: 'flex flex-col gap-4' }"
  >
    <template #header>
      <h1 class="text-3xl text-center [word-break:break-word]">
        {{ props.name }}
      </h1>
      <div class="noImage">
        {{ $t('recipeCardDetails.noImage') }}
      </div>
    </template>
    <div class="data">
      <div class="grid grid-cols-2 gap-4 pb-2">
        <div class="flex items-center justify-center gap-2">
          <UIcon name="ic:baseline-people-alt" />
          <span class="value">{{ props.peopleNumber }}</span>
        </div>
        <div class="flex items-center justify-center gap-2">
          <UIcon name="mdi:knife" />
          <span class="value">{{ formatDurationUtils(props.preparationTime) }}</span>
        </div>
        <div class="flex items-center justify-center gap-2">
          <UIcon name="material-symbols:oven-outline-rounded" />
          <span class="value">{{ formatDurationUtils(props.cookingTime) }}</span>
        </div>
        <div class="flex items-center justify-center gap-2">
          <UIcon name="mdi:sleep" />
          <span class="value">{{ formatDurationUtils(props.restTime) }}</span>
        </div>
      </div>
      <p class="mt-3 ellipsis [word-break:break-word]">
        {{ props.description }}
      </p>
    </div>
    <template #footer>
      <div class="footer flex justify-between items-center">
        <p>{{ $t('createdBy', { username: props.fullName }) }}</p>
        <p>{{ $d(props.createdAt, 'short') }}</p>
      </div>
    </template>
  </UCard>
</template>

<style lang="scss">
  .recipeCard {
    .ellipsis {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .noImage {
      aspect-ratio: 3 / 1;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
    }
  }
</style>
