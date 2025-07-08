<script lang="ts" setup>
async function uploadWithPresignedUrl(event: Event) {
  const files = (event.target as HTMLInputElement)?.files;
  if (files?.[0]) {
    const { url } = await $fetch(`/api/blob/sign/${files[0].name}`, {
      method: 'GET',
    });
    await $fetch(url, {
      method: 'PUT',
      body: files[0],
    });
  }
}
</script>

<template>
  <div class="m-auto w-1/2 flex flex-col">
    <UInput
      type="file"
      @change="uploadWithPresignedUrl($event)"
    />
  </div>
</template>
