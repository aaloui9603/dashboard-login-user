import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasksByUser: {
      'admin@test.de': [
        { id: 1, text: 'Profil vervollständigen', done: true, categoryId: null },
        { id: 2, text: 'Erste Projektübersicht durchlesen', done: true, categoryId: null },
        { id: 3, text: 'Mit dem Team-Lead Rücksprache halten', done: false, categoryId: null },
        { id: 4, text: 'Wöchentlichen Statusbericht einreichen', done: false, categoryId: null },
      ],
    },
    categoriesByUser: {},
  }),

  getters: {
    tasks(state) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return []
      return state.tasksByUser[email] || []
    },

    categories(state) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return []
      return state.categoriesByUser[email] || []
    },
  },

  actions: {
    _ensureUserBucket(email) {
      if (!this.tasksByUser[email]) this.tasksByUser[email] = []
      if (!this.categoriesByUser[email]) this.categoriesByUser[email] = []
    },

    toggleTask(id) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return

      const task = (this.tasksByUser[email] || []).find((t) => t.id === id)
      if (task) task.done = !task.done
    },

    addTask(text, categoryId = null) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return

      const trimmed = text.trim()
      if (!trimmed) return

      this._ensureUserBucket(email)
      const userTasks = this.tasksByUser[email]

      const newId = userTasks.length
        ? Math.max(...userTasks.map((t) => t.id)) + 1
        : 1

      userTasks.push({ id: newId, text: trimmed, done: false, categoryId })
    },

    deleteTask(id) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return

      this.tasksByUser[email] = (this.tasksByUser[email] || []).filter((t) => t.id !== id)
    },

    addCategory(name, color) {
            const authStore = useAuthStore()
            const email = authStore.user?.email
            if (!email) return { success: false, message: 'Nicht eingeloggt.' }

            const trimmed = name.trim()
            if (!trimmed) return { success: false, message: 'Bitte einen Namen eingeben.' }

            this._ensureUserBucket(email)
            const userCategories = this.categoriesByUser[email]

            const alreadyExists = userCategories.some(
                (c) => c.name.toLowerCase() === trimmed.toLowerCase()
            )

            if (alreadyExists) {
                return { success: false, message: `Kategorie "${trimmed}" existiert bereits.` }
            }

            const newId = userCategories.length
                ? Math.max(...userCategories.map((c) => c.id)) + 1
                : 1

            userCategories.push({ id: newId, name: trimmed, color })
            return { success: true }
        },

    deleteCategory(id) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return

      this.categoriesByUser[email] = (this.categoriesByUser[email] || []).filter((c) => c.id !== id)

      // Aufgaben, die diese Kategorie nutzten, verlieren die Zuordnung
      ;(this.tasksByUser[email] || []).forEach((task) => {
        if (task.categoryId === id) task.categoryId = null
      })
    },

    getCategoryById(id) {
      const authStore = useAuthStore()
      const email = authStore.user?.email
      if (!email) return null

      return (this.categoriesByUser[email] || []).find((c) => c.id === id) || null
    },
  },

  persist: true,
})