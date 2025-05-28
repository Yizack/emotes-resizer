<template>
  <div class="flex flex-col min-h-dvh">
    <NavBar class="bg-muted" />
    <slot />
    <footer class="bg-muted border-t border-muted py-4 text-center">
      <p>Made with ❤️</p>
      <p class="text-sm text-muted-foreground">© <ULink to="https://yizack.com">Yizack Rangel</ULink></p>
    </footer>
  </div>
</template>
