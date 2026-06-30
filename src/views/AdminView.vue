<script setup>
import { computed } from 'vue'
import { MOCK_USER_LIST } from '@/constants/mockUserList'
import StatusBadge from '@/components/StatusBadge.vue'

const totalUsers = computed(() => MOCK_USER_LIST.length)
const adminCount = computed(() => MOCK_USER_LIST.filter((u) => u.role === 'admin').length)
const activeCount = computed(() => MOCK_USER_LIST.filter((u) => u.status === 'active').length)
</script>

<template>
  <div class="admin-view">
    <h1>Admin-Bereich</h1>

    <div class="stats">
      <div class="stat-card">
        <p class="stat-value">{{ totalUsers }}</p>
        <p class="stat-label">User gesamt</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ adminCount }}</p>
        <p class="stat-label">Admins</p>
      </div>
      <div class="stat-card">
        <p class="stat-value">{{ activeCount }}</p>
        <p class="stat-label">Aktiv</p>
      </div>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-Mail</th>
          <th>Rolle</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in MOCK_USER_LIST" :key="u.id">
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role }}</td>
          <td><StatusBadge :status="u.status" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.admin-view {
  h1 {
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }
}

.stats {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.stat-card {
  @include glass-teal;
  flex: 1;
  padding: var(--spacing-sm);
  text-align: center;

  .stat-value {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-teal-accent);
  }

  .stat-label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
}

.user-table {
  @include glass-teal;
  width: 100%;
  border-collapse: collapse;
  padding: var(--spacing-sm);

  th, td {
    text-align: left;
    padding: 0.75rem 1rem;
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-teal-border);
  }

  th {
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
  }

  tr:last-child td {
    border-bottom: none;
  }
}
</style>