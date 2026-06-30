<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-teal-bg);
}

.app-content {
  flex: 1;
  padding: var(--spacing-md);
  min-width: 0; 
  overflow-x: hidden; 
}

@media (max-width: 767px ) {
    .app-content {
        padding: var(--spacing-sm);
    }
}
</style>