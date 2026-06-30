<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

// Statische Beispiel-Aufgaben — kein Backend, fest im Code
const tasks = [
  { id: 1, text: 'Profil vervollständigen', done: true },
  { id: 2, text: 'Erste Projektübersicht durchlesen', done: true },
  { id: 3, text: 'Mit dem Team-Lead Rücksprache halten', done: false },
  { id: 4, text: 'Wöchentlichen Statusbericht einreichen', done: false },
]
</script>

<template>
  <div class="dashboard-view">
    <h1>Mein Dashboard</h1>

    <div class="profile-card">
      <div class="avatar">{{ authStore.user?.name?.charAt(0) }}</div>
      <div class="profile-info">
        <p class="name">{{ authStore.user?.name }}</p>
        <p class="email">{{ authStore.user?.email }}</p>
        <p class="role">{{ authStore.role }}</p>
      </div>
    </div>

    <div class="tasks-card">
      <h2>Meine Aufgaben</h2>
      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id" :class="{ done: task.done }">
          <span class="check">{{ task.done ? '✓' : '○' }}</span>
          {{ task.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.dashboard-view {
  h1 {
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  h2 {
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-sm);
  }
}

.profile-card {
  @include glass-teal;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-pill);
    background: var(--color-teal-accent);
    color: var(--color-teal-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    flex-shrink: 0;
  }

  .profile-info {
    .name {
      color: var(--color-text-primary);
      font-weight: var(--font-weight-bold);
    }
    .email {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }
    .role {
      color: var(--color-teal-accent);
      font-size: var(--font-size-xs);
      text-transform: capitalize;
    }
  }
}

.tasks-card {
  @include glass-teal;
  padding: var(--spacing-md);
}

.task-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  li {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--color-text-primary);

    .check {
      color: var(--color-text-muted);
    }

    &.done {
      color: var(--color-text-muted);
      text-decoration: line-through;

      .check {
        color: var(--color-success);
      }
    }
  }
}
</style>