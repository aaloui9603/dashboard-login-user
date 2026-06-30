<script setup>
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <button
    class="theme-toggle"
    @click="themeStore.toggleTheme()"
    :aria-label="themeStore.theme === 'dark' ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'"
  >
    {{ themeStore.theme === 'dark' ? '☀️' : '🌙' }}
  </button>
</template>

<style lang="scss" scoped>
.theme-toggle {
  position: fixed;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  z-index: var(--z-sticky);
  width: var(--toggle-size);
  height: var(--toggle-size);
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-aurora-border);
  background: var(--color-aurora-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: var(--transition-fast);

  &:hover {
    opacity: 0.85;
  }
}
</style>