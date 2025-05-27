<script setup lang="ts">
const files = ref<FileList | null>(null);
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-dvh py-8">
    <UContainer>
      <h1 class="mb-4 font-medium text-2xl text-center">Emotes Resizer</h1>
      <FilesDropZone v-model="files" :multiple="true" accept="image/*" :max-size-m-b="5" />
    </UContainer>
  </main>
</template>
