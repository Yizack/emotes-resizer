<script setup lang="ts">
const toast = useToast();
const electron = useElectron();

const files = ref<{ name: string, path: string }[]>([]);
const isLoading = ref(false);

const generateOptions = ref<ImagesProcessOptions<"generate">>({
  action: "generate",
  sizes: ["28", "56", "112"]
});

const resizeOptions = ref<ImagesProcessOptions<"resize">>({
  action: "resize"
});

const scaleOptions = ref<ImagesProcessOptions<"scale">>({
  action: "scale"
});

const options = ref<ImagesProcessOptions>({
  resample: "nearest",
  action: "generate",
  format: "auto"
});

const customSizes = ref({
  items: defaultSizes,
  new: ""
});

const selectedOptions = computed(() => {
  switch (options.value.action) {
    default:
    case "generate":
      return toRaw(generateOptions.value);
    case "resize":
      return toRaw(resizeOptions.value);
    case "scale":
      return toRaw(scaleOptions.value);
  }
});

const processFiles = async () => {
  if (!files.value?.length) return;
  if (options.value.action === "generate" && !generateOptions.value.sizes?.length) {
    toast.add({ title: APP.name, description: "Please select or add at least one size to generate.", color: "error" });
    return;
  }

  const paths = files.value.map(file => file.path);
  const mergedOptions = { ...toRaw(options.value), ...selectedOptions.value };
  isLoading.value = true;
  electron.processImages(paths, mergedOptions).then(() => {
    toast.add({ title: APP.name, description: "Your images have been processed.", color: "success", duration: 2000 });
    files.value = [];
  }).catch((error: Error) => {
    toast.add({ title: APP.name, description: `An error occurred while processing your images: ${error.message}`, color: "error" });
  }).finally(() => {
    isLoading.value = false;
  });
};

const addSize = () => {
  const sizeExists = customSizes.value.items.some(size => size.value === customSizes.value.new);
  if (sizeExists || !customSizes.value.new) return;
  customSizes.value.items.push({
    label: `${customSizes.value.new}x${customSizes.value.new}`,
    value: customSizes.value.new
  });
};
</script>

<template>
  <main class="py-8 flex items-center justify-center grow">
    <UContainer class="w-full sm:w-xl mx-auto" as="form" @submit.prevent="processFiles">
      <FilesDropZone v-model="files" :multiple="true" accept="image/*" />
      <div v-if="files && files.length" class="mt-4">
        <USeparator class="my-4" />
        <h2 class="text-xl font-bold mb-4">Processing options</h2>
        <div class="grid grid-cols-2 gap-4">
          <FloatingSelect v-model="options.resample" :items="resampleItems" placeholder="Resample" />
          <FloatingSelect v-model="options.action" :items="actionItems" placeholder="Action" />
          <FloatingSelect v-model="options.format" :items="formatItems" placeholder="Output format" />
        </div>
        <div class="my-4">
          <template v-if="options.action === 'generate'">
            <h3 class="font-medium">Sizes</h3>
            <p class="text-sm text-muted mb-2">Select or add the sizes in pixels you want to generate.</p>
            <UCheckboxGroup v-model="generateOptions.sizes" :items="customSizes.items" size="lg" variant="card" orientation="horizontal" class="mb-2" :ui="{ fieldset: 'flex-wrap' }" />
            <UButtonGroup size="lg">
              <UInput v-model.string="customSizes.new" type="number" label="Add another" placeholder="Size in pixels..." />
              <UBadge color="neutral" variant="outline" label="px" />
              <UButton label="Add size" variant="subtle" @click="addSize" />
            </UButtonGroup>
          </template>
          <template v-else-if="options.action === 'scale'">
            <h3 class="font-medium">Scale factor</h3>
            <p class="text-sm text-muted mb-2">100% = original size</p>
            <UButtonGroup size="lg">
              <UInput v-model.number="scaleOptions.percent" type="number" min="1" placeholder="Percentage" required />
              <UBadge color="neutral" variant="outline" label="%" />
            </UButtonGroup>
          </template>
          <template v-else-if="options.action === 'resize'">
            <h3 class="font-medium">Resize to</h3>
            <p class="text-sm text-muted mb-2">Specify the width and height in pixels. Aspect ratio won't be preserved.</p>
            <div class="flex gap-2">
              <UButtonGroup size="lg">
                <UInput v-model="resizeOptions.width" type="number" label="Width" placeholder="Width" required />
                <UBadge color="neutral" variant="outline" label="px" />
              </UButtonGroup>
              <UButtonGroup size="lg">
                <UInput v-model="resizeOptions.height" type="number" label="Height" placeholder="Height" required />
                <UBadge color="neutral" variant="outline" label="px" />
              </UButtonGroup>
            </div>
          </template>
        </div>
      </div>
      <div v-if="files && files.length" class="grid mt-3">
        <UButton :label="isLoading ? '' : 'Process file(s)'" variant="solid" size="xl" class="justify-center" type="submit" :disabled="isLoading" :loading="isLoading" />
      </div>
    </UContainer>
  </main>
</template>
