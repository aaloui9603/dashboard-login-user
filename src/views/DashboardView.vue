<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTasksStore } from '@/stores/tasksStore'

const authStore = useAuthStore()
const tasksStore = useTasksStore()

const newTaskText = ref('')
const selectedCategoryId = ref('')

const newCategoryName = ref('')
const newCategoryColor = ref('#2dd4bf')

function handleAddTask() {
  const categoryId = selectedCategoryId.value ? Number(selectedCategoryId.value) : null
  tasksStore.addTask(newTaskText.value, categoryId)
  newTaskText.value = ''
  selectedCategoryId.value = ''
}

function handleAddCategory() {
  if (!newCategoryName.value.trim()) return
  tasksStore.addCategory(newCategoryName.value, newCategoryColor.value)
  newCategoryName.value = ''
  newCategoryColor.value = '#2dd4bf'
}
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

    <div class="categories-card">
      <h2>Kategorien</h2>

      <form class="add-category-form" @submit.prevent="handleAddCategory">
        <input
          v-model="newCategoryName"
          type="text"
          placeholder="Neue Kategorie..."
          maxlength="20"
        />
        <input v-model="newCategoryColor" type="color" aria-label="Kategoriefarbe" />
        <button type="submit">+</button>
      </form>

      <ul class="category-list">
        <li v-for="category in tasksStore.categories" :key="category.id">
          <span class="dot" :style="{ backgroundColor: category.color }"></span>
          <span class="name">{{ category.name }}</span>
          <button
            class="delete-btn"
            @click="tasksStore.deleteCategory(category.id)"
            aria-label="Kategorie löschen"
          >
            ✕
          </button>
        </li>
      </ul>

      <p v-if="!tasksStore.categories.length" class="empty-hint">
        Noch keine Kategorien angelegt.
      </p>
    </div>

    <div class="tasks-card">
      <h2>Meine Aufgaben</h2>

      <form class="add-task-form" @submit.prevent="handleAddTask">
        <input v-model="newTaskText" type="text" placeholder="Neue Aufgabe..." />
        <select v-model="selectedCategoryId">
          <option value="">Keine Kategorie</option>
          <option v-for="category in tasksStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <button type="submit">+</button>
      </form>

      <ul class="task-list">
        <li v-for="task in tasksStore.tasks" :key="task.id" :class="{ done: task.done }">
          <span class="check" @click="tasksStore.toggleTask(task.id)">{{ task.done ? '✓' : '○' }}</span>
          <span
            v-if="task.categoryId"
            class="category-badge"
            :style="{ backgroundColor: tasksStore.getCategoryById(task.categoryId)?.color }"
          >
            {{ tasksStore.getCategoryById(task.categoryId)?.name }}
          </span>
          <span class="text" @click="tasksStore.toggleTask(task.id)">{{ task.text }}</span>
          <button class="delete-btn" @click="tasksStore.deleteTask(task.id)" aria-label="Aufgabe löschen">✕</button>
        </li>
      </ul>

      <p v-if="!tasksStore.tasks.length" class="empty-hint">Keine Aufgaben mehr — Mashallah!</p>
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

.categories-card {
  @include glass-teal;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.add-category-form {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);

  input[type='text'] {
    flex: 1;
    background: var(--input-bg);
    border: 1px solid var(--color-teal-border);
    border-radius: var(--radius-sharp);
    padding: var(--input-padding-y) var(--input-padding-x);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);

    &:focus {
      outline: none;
      border-color: var(--color-teal-accent);
    }
  }

  input[type='color'] {
    width: 40px;
    height: auto;
    border: 1px solid var(--color-teal-border);
    border-radius: var(--radius-sharp);
    background: transparent;
    cursor: pointer;
    padding: 2px;
  }

  button {
    background: var(--color-teal-accent);
    color: var(--color-teal-bg);
    border: none;
    border-radius: var(--radius-sharp);
    padding: 0 var(--spacing-sm);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-md);
    cursor: pointer;
    transition: var(--transition-fast);

    &:hover {
      opacity: 0.85;
    }
  }
}

.category-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);

  li {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--input-bg);
    border: 1px solid var(--color-teal-border);
    border-radius: var(--radius-pill);
    padding: 4px var(--spacing-xs);
    color: var(--color-text-primary);
    font-size: var(--font-size-sm);

    .dot {
      width: 10px;
      height: 10px;
      border-radius: var(--radius-pill);
      flex-shrink: 0;
    }

    .delete-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
      font-size: var(--font-size-xs);
      padding: 0;
      line-height: 1;
      transition: var(--transition-fast);

      &:hover {
        color: var(--color-danger);
      }
    }
  }
}

.tasks-card {
  @include glass-teal;
  padding: var(--spacing-md);
}

.add-task-form {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);

  input {
    flex: 1;
    background: var(--input-bg);
    border: 1px solid var(--color-teal-border);
    border-radius: var(--radius-sharp);
    padding: var(--input-padding-y) var(--input-padding-x);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);

    &:focus {
      outline: none;
      border-color: var(--color-teal-accent);
    }
  }

  select {
    background: var(--input-bg);
    border: 1px solid var(--color-teal-border);
    border-radius: var(--radius-sharp);
    padding: var(--input-padding-y) var(--input-padding-x);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    max-width: 140px;

    &:focus {
      outline: none;
      border-color: var(--color-teal-accent);
    }
  }

  button {
    background: var(--color-teal-accent);
    color: var(--color-teal-bg);
    border: none;
    border-radius: var(--radius-sharp);
    padding: 0 var(--spacing-sm);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-md);
    cursor: pointer;
    transition: var(--transition-fast);

    &:hover {
      opacity: 0.85;
    }
  }
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
      cursor: pointer;
    }

    .category-badge {
      font-size: var(--font-size-xs);
      color: var(--color-teal-bg);
      padding: 2px 8px;
      border-radius: var(--radius-pill);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .text {
      flex: 1;
      cursor: pointer;
    }

    .delete-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
      font-size: var(--font-size-sm);
      padding: var(--icon-btn-padding);
      transition: var(--transition-fast);

      &:hover {
        color: var(--color-danger);
      }
    }

    &.done {
      .text {
        color: var(--color-text-muted);
        text-decoration: line-through;
      }

      .check {
        color: var(--color-success);
      }
    }
  }
}

.empty-hint {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
  margin: var(--spacing-sm) 0 0;
}
</style>