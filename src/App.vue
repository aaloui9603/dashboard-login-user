<script setup>
import { watch, onMounted } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import ThemeToggle from '@/components/ThemeToggle.vue'

const themeStore = useThemeStore()

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

onMounted(() => {
  applyTheme(themeStore.theme)
})

watch(
  () => themeStore.theme,
  (newTheme) => applyTheme(newTheme)
)
</script>

<template>
  <ThemeToggle />
  <RouterView />
</template>