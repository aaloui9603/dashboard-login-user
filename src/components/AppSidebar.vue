<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isOpen = ref(false)

function handleLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}

function closeSidebar() {
  isOpen.value = false
}
</script>

<template>
  <button class="burger" @click="isOpen = !isOpen" aria-label="Menü öffnen">
    ☰
  </button>

  <div v-if="isOpen" class="overlay" @click="closeSidebar"></div>

  <aside class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <p class="user-name">{{ authStore.user?.name }}</p>
      <p class="user-role">{{ authStore.role }}</p>
    </div>

    <nav class="sidebar-nav">
      <RouterLink to="/dashboard" @click="closeSidebar">Dashboard</RouterLink>
      <RouterLink v-if="authStore.role === 'admin'" to="/admin" @click="closeSidebar">Admin</RouterLink>
      <RouterLink to="/profile" @click="closeSidebar">Profil</RouterLink>
    </nav>

    <button class="logout-btn" @click="handleLogout">Logout</button>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.burger {
  display: none;
  position: fixed;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  z-index: var(--z-sticky);
  background: var(--color-teal-glass);
  border: 1px solid var(--color-teal-border);
  border-radius: var(--radius-sharp);
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  padding: 0.4rem 0.7rem;
  cursor: pointer;
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-overlay, 200);
}

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

    &.router-link-active {
      background: var(--color-teal-glass);
      color: var(--color-teal-accent);
      font-weight: var(--font-weight-bold);
      border-left: 3px solid var(--color-teal-accent);
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

// ===== Mobile (unter 768px) =====
@media (max-width: 767px) {
  .burger {
    display: block;
  }

  .overlay {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    z-index: var(--z-modal);
    transition: transform var(--transition-base);

    &.open {
      transform: translateX(0);
    }
  }
}
</style>