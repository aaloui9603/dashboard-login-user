<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <p class="user-name">{{ authStore.user?.name }}</p>
      <p class="user-role">{{ authStore.role }}</p>
    </div>

    <nav class="sidebar-nav">
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink v-if="authStore.role === 'admin'" to="/admin">Admin</RouterLink>
      <RouterLink to="/profile">Profil</RouterLink>
    </nav>

    <button class="logout-btn" @click="handleLogout">Logout</button>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.sidebar {
  @include glass-teal;
  width: 220px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm);
  gap: var(--spacing-md);
}

.sidebar-header {
  .user-name {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-bold);
  }
  .user-role {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    text-transform: capitalize;
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;

  a {
    color: var(--color-text-secondary);
    text-decoration: none;
    padding: 0.6rem 0.8rem;
    border-radius: var(--radius-sharp);
    transition: var(--transition-fast);

    &:hover {
      background: var(--color-teal-glass);
      color: var(--color-text-primary);
    }
  }
}

.logout-btn {
  background: transparent;
  border: 1px solid var(--color-teal-border);
  border-radius: var(--radius-sharp);
  color: var(--color-text-primary);
  padding: var(--button-padding-y);
  cursor: pointer;
  transition: var(--transition-fast);

  &:hover {
    background: var(--color-danger);
    border-color: var(--color-danger);
  }
}
</style>