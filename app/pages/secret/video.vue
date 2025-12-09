<template>
  <div class="fixed inset-0 bg-black flex items-center justify-center">
    <video
      autoplay
      class="w-full h-full object-contain"
      src="~/assets/video.mp4"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>

<style>

</style>
