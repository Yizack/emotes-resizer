<script setup lang="ts">
const props = defineProps<{
  label?: string;
  multiple?: boolean;
  accept?: string;
}>();

const electron = useElectron();
const model = defineModel<{ path: string, name: string }[]>({ default: () => [] });
const isDragging = ref(false);
const isOpened = ref(false);

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

const handleDrop = async (e: DragEvent) => {
  isDragging.value = false;
  dragCounter.value = 0;
  const items = e.dataTransfer?.items;

  if (!items?.length) return;

  const paths: { path: string, name: string }[] = [];
  for (const item of items) {
    const file = item.getAsFile();
    if (!file || (props.accept && !file.type.match(props.accept))) {
      continue;
    }
    const path = electron.getFilePath(file);
    paths.push({ path, name: file.name });
  }
  model.value = paths;
};

const openFileDialog = async () => {
  if (model.value?.length || isOpened.value) return;
  isOpened.value = true;
  electron.selectImages().then((files) => {
    model.value = files.filter(file => file.type && props.accept && file.type.match(props.accept));
  }).finally(() => {
    isOpened.value = false;
  });
};

const fileNames = computed(() => {
  if (!model.value) return [];
  return model.value.map(file => file.name);
});

const clearFiles = () => {
  model.value = [];
};
</script>

<template>
  <div
    class="w-full min-h-[200px] border-2 border-dashed rounded-lg text-center transition-all duration-200 flex items-center justify-center border-muted hover:border-primary hover:bg-muted p-4 sm:px-6 lg:px-8"
    :class="{
      'min-h-[400px]': !model || !model.length,
      'border-primary bg-muted': isDragging || model && model.length,
    }"
    @dragenter.prevent.stop="handleDragEnter"
    @dragleave.prevent.stop="handleDragLeave"
    @dragover.prevent.stop="handleDragOver"
    @drop.prevent.stop="handleDrop"
    @click.prevent.stop="openFileDialog"
  >
    <div v-if="!model || model.length === 0" class="flex flex-col items-center justify-center">
      <Icon name="lucide:file-up" size="2em" class="mb-2" />
      <p class="mb-2 text-base">{{ label || 'Drag files here or click to browse' }}</p>
      <UButton v-if="isDragging" label="Drop files" variant="solid" />
      <UButton v-else label="Browse files" variant="subtle" />
    </div>

    <div v-else class="w-full flex flex-col items-center justify-center">
      <p class="font-medium">{{ model.length }} file(s) selected</p>
      <ul class="my-4 text-left list-none w-full border rounded-lg border-muted text-sm">
        <li v-for="(name, i) in fileNames" :key="name" class="p-3 break-all border-muted" :class="{ 'border-b': i < fileNames.length - 1 }">{{ name }}</li>
      </ul>
      <UButton label="Clear files" variant="subtle" color="error" @click.stop="clearFiles" />
    </div>
  </div>
</template>
