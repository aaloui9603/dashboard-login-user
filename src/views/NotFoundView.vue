<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

function goHome() {
  router.push({ name: authStore.isLoggedIn ? 'dashboard' : 'login' })
}
</script>

<template>
  <div class="not-found">
    <div class="not-found-card">
      <p class="code">404</p>
      <h1>Seite nicht gefunden</h1>
      <p class="hint">Diese Route existiert nicht oder wurde verschoben.</p>
      <button @click="goHome">Zurück zur Startseite</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-teal-bg);
  padding: var(--spacing-sm);
}

.not-found-card {
  @include glass-teal;
  text-align: center;
  padding: var(--spacing-lg);
  max-width: 360px;

  .code {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-teal-accent);
    margin: 0;
  }

  h1 {
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    margin: var(--spacing-xs) 0;
  }

  .hint {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
  }

  button {
    background: var(--color-teal-accent);
    color: var(--color-teal-bg);
    border: none;
    border-radius: var(--radius-pill);
    padding: var(--button-padding-y) var(--spacing-sm);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: var(--transition-fast);

    &:hover {
      opacity: 0.85;
    }
  }
}
</style>