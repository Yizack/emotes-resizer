<script setup lang="ts" generic="T extends string | number">
import type { SelectProps } from "@nuxt/ui";

const props = defineProps<{
  items: NonNullable<SelectProps["items"]>;
  color?: SelectProps["color"];
  placeholder?: SelectProps["placeholder"];
  variant?: SelectProps["variant"];
  size?: SelectProps["size"];
}>();

const model = defineModel<T>();

const selectedItemLabel = computed(() => {
  if (model.value === undefined) return "";

  const selected = props.items.find((item) => {
    if (item && typeof item === "object" && "value" in item) {
      return item.value === model.value;
    }
    return item === model.value;
  });

  if (selected && typeof selected === "object" && "label" in selected) {
    return selected.label;
  }
  return model.value;
});
</script>

<template>
  <USelect v-model="model" v-bind="props" class="w-full" placeholder="" :ui="{ base: 'peer' }">
    {{ selectedItemLabel }}
    <label class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal">
      <span class="inline-flex bg-default px-1">{{ placeholder }}</span>
    </label>
  </USelect>
</template>
