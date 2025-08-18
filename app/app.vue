<script setup lang="ts">
import type { ToastProps } from "@nuxt/ui";

const toast = useToast();
const toasts = ref<(Omit<ToastProps, "ui" | "avatar" | "actions" | "close"> & { id: string | number })[]>([]);

const saveToasts = () => {
  toasts.value = toast.toasts.value;
  toast.clear();
};

const restoreToasts = () => {
  for (const saved of toasts.value) {
    const createdAt = Number(saved.id.toString().split("-")[0]);
    const elapsed = Date.now() - createdAt;
    const duration = saved.duration || 5000;

    if (elapsed >= duration) continue;
    const remaining = duration - elapsed;

    // @ts-expect-error disable TS258
    toast.add({ ...saved, duration: remaining });
  }

  if (toasts.value.length) {
    toasts.value = [];
  }
};

onMounted(() => {
  window.addEventListener("blur", saveToasts);
  window.addEventListener("focus", restoreToasts);
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator :throttle="0" />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
