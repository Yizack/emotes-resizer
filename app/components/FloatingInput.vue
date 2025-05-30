<script setup lang="ts">
import type { InputProps } from "@nuxt/ui";

const props = withDefaults(defineProps<{
  color?: InputProps["color"];
  placeholder: InputProps["placeholder"];
  variant?: InputProps["variant"];
  size?: InputProps["size"];
}>(), {
  size: "lg"
});

const model = defineModel<string | number>();
</script>

<template>
  <UInput v-model="model" v-bind="props" class="w-full" placeholder="" :ui="{ base: 'h-full peer' }">
    <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal">
      <span class="inline-flex bg-default px-1">{{ placeholder }}</span>
    </label>
  </UInput>
</template>
