<script setup lang="ts">
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <nav class="sticky top-0 z-10 w-full border-b border-muted">
    <UContainer class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Icon name="ph:arrows-in-simple-duotone" class="text-primary" size="2em" />
        <h1 class="text-xl font-bold">{{ APP.name }}</h1>
      </div>
      <div class="flex items-center">
        <ClientOnly>
          <UTooltip :delay-duration="0" text="Switch color mode">
            <ULink class="flex items-center hover:bg-accented p-4" @click="toggleColorMode">
              <Icon :name="colorMode.preference === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="1.3em" />
            </ULink>
          </UTooltip>
          <template #fallback>
            <UButton icon="lucide:circle-dashed" class="bg-transparent hover:bg-slate-50/10" />
          </template>
        </ClientOnly>
        <UTooltip :delay-duration="0" text="Visit GitHub repository">
          <ULink :to="APP.repository" class="flex items-center hover:bg-accented p-4">
            <Icon name="lucide:github" size="1.3em" />
          </ULink>
        </UTooltip>
      </div>
    </UContainer>
  </nav>
</template>
