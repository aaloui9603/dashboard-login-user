<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import { useUserListStore } from '@/stores/userListStore'
import StatusBadge from '@/components/StatusBadge.vue'
import AddUserForm from '@/components/AddUserForm.vue'

const authStore = useAuthStore()
const userListStore = useUserListStore()
const toast = useToast()

const showForm = ref(false)
const pendingDeleteId = ref(null)

const totalUsers = computed(() => userListStore.users.length)
const adminCount = computed(() => userListStore.users.filter((u) => u.role === 'admin').length)
const activeCount = computed(() => userListStore.users.filter((u) => u.status === 'active').length)

function isSelf(user) {
  return user.email === authStore.user?.email
}

function requestDelete(id) {
  pendingDeleteId.value = id
}

function cancelDelete() {
  pendingDeleteId.value = null
}

function confirmDelete(id) {
  const result = userListStore.deleteUser(id)

  if (!result.success) {
    toast.error(result.message)
  } else {
    toast.success('User gelöscht.')
  }

  pendingDeleteId.value = null
}
</script>

<template>
  <div class="admin-view">
    <div class="header-row">
      <h1>Admin-Bereich</h1>
      <button class="add-btn" @click="showForm = !showForm">
        {{ showForm ? 'Abbrechen' : '+ Neuer User' }}
      </button>
    </div>

    <AddUserForm v-if="showForm" @close="showForm = false" />

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

    <div class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Rolle</th>
            <th>Status</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in userListStore.users" :key="u.id">
            <td>{{ u.name }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.role }}</td>
            <td><StatusBadge :status="u.status" /></td>
            <td class="actions-cell">
              <template v-if="pendingDeleteId === u.id">
                <span class="confirm-text">Wirklich löschen?</span>
                <button class="confirm-btn" @click="confirmDelete(u.id)">Ja</button>
                <button class="cancel-btn" @click="cancelDelete">Nein</button>
              </template>
              <template v-else>
                <button
                  class="delete-btn"
                  :disabled="isSelf(u)"
                  :title="isSelf(u) ? 'Du kannst dich nicht selbst löschen' : 'User löschen'"
                  @click="requestDelete(u.id)"
                >
                  Löschen
                </button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.admin-view {
  h1 {
    color: var(--color-text-primary);
    margin: 0;
  }
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.add-btn {
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

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.stat-card {
  @include glass-teal;
  flex: 1 1 100px;
  min-width: 0;
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

.table-wrapper {
  overflow-x: auto;
}

.user-table {
  @include glass-teal;
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  padding: var(--spacing-sm);

  th, td {
    text-align: left;
    padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
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

.actions-cell {
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.delete-btn {
  background: transparent;
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-pill);
  padding: 4px var(--spacing-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-fast);

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

.confirm-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.confirm-btn {
  background: var(--color-danger);
  color: var(--color-teal-bg);
  border: none;
  border-radius: var(--radius-pill);
  padding: 4px var(--spacing-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  font-weight: var(--font-weight-bold);

  &:hover {
    opacity: 0.85;
  }
}

.cancel-btn {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-teal-border);
  border-radius: var(--radius-pill);
  padding: 4px var(--spacing-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
}
</style>