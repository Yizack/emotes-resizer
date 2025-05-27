<script setup lang="ts">
defineProps<{
  label?: string;
  multiple?: boolean;
  accept?: string;
}>();

const model = defineModel<FileList | null>();
const isDragging = ref(false);
const inputRef = useTemplateRef<HTMLInputElement | null>("input");

const dragCounter = ref(0);

const handleDragEnter = () => {
  dragCounter.value++;
  isDragging.value = true;
};

const handleDragLeave = () => {
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  dragCounter.value = 0;

  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    model.value = e.dataTransfer.files;
  }
};

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    model.value = target.files;
  }
};

const openFileDialog = () => inputRef.value?.click();

const fileNames = computed(() => {
  if (!model.value) return [];
  return Array.from(model.value).map(file => file.name);
});

const clearFiles = () => {
  model.value = null;
  if (inputRef.value) {
    inputRef.value.value = "";
  }
};
</script>

<template>
  <div
    class="w-full sm:w-xl mx-auto lg:min-h-[200px] border-2 border-dashed rounded-lg text-center transition-all duration-200 flex items-center justify-center border-muted hover:border-primary hover:bg-muted p-4 sm:px-6 lg:px-8"
    :class="{
      'border-primary bg-muted': isDragging,
      'bg-muted': model && model.length > 0,
    }"
    @dragenter.prevent.stop="handleDragEnter"
    @dragleave.prevent.stop="handleDragLeave"
    @dragover.prevent.stop="handleDragOver"
    @drop.prevent.stop="handleDrop"
    @click="openFileDialog"
  >
    <div v-if="!model || model.length === 0" class="flex flex-col items-center justify-center">
      <Icon name="lucide:file-up" size="2em" class="mb-2" />
      <p class="mb-2 text-base">{{ label || 'Drag files here or click to browse' }}</p>
      <UButton v-if="isDragging" label="Drop files" variant="solid" />
      <UButton v-else label="Browse files" variant="subtle" />
      <input ref="input" type="file" :multiple="multiple" :accept="accept" class="hidden" @change="handleFileInput">
    </div>

    <div v-else class="w-full flex flex-col items-center justify-center">
      <ul class="my-4 text-left list-none w-full border rounded-lg border-muted text-sm">
        <li v-for="(name, i) in fileNames" :key="name" class="p-2 break-all border-muted" :class="{ 'border-b': i < fileNames.length - 1 }">{{ name }}</li>
      </ul>
      <UButton label="Clear files" variant="subtle" color="error" @click.stop="clearFiles" />
    </div>
  </div>
</template>
