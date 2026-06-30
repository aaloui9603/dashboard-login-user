<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="profile-view">
    <h1>Mein Profil</h1>

    <div class="profile-card">
      <div class="avatar-large">{{ authStore.user?.name?.charAt(0) }}</div>

      <dl class="profile-details">
        <dt>Name</dt>
        <dd>{{ authStore.user?.name }}</dd>

        <dt>E-Mail</dt>
        <dd>{{ authStore.user?.email }}</dd>

        <dt>Rolle</dt>
        <dd class="role-value">{{ authStore.role }}</dd>
      </dl>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.profile-view {
  h1 {
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }
}

.profile-card {
  @include glass-teal;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  max-width: 480px;
  width: 100%;
}

.avatar-large {
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: var(--radius-pill);
  background: var(--color-teal-accent);
  color: var(--color-teal-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.profile-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xs) var(--spacing-sm);
  margin: 0;
  min-width: 0;

  dt {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    white-space: nowrap;
  }

  dd {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    margin: 0;
    overflow-wrap: break-word;
    min-width: 0;
  }

  .role-value {
    color: var(--color-teal-accent);
    text-transform: capitalize;
  }
}

// ===== Mobile: weniger Padding, Avatar oberhalb der Details =====
@media (max-width: 480px) {
  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
  }
}
</style>