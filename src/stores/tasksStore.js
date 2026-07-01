import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      { id: 1, text: 'Profil vervollständigen', done: true, categoryId: null },
      { id: 2, text: 'Erste Projektübersicht durchlesen', done: true, categoryId: null },
      { id: 3, text: 'Mit dem Team-Lead Rücksprache halten', done: false, categoryId: null },
      { id: 4, text: 'Wöchentlichen Statusbericht einreichen', done: false, categoryId: null },
    ],
    categories: [],
  }),

  actions: {
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.done = !task.done
    },

    addTask(text, categoryId = null) {
      const trimmed = text.trim()
      if (!trimmed) return

      const newId = this.tasks.length
        ? Math.max(...this.tasks.map((t) => t.id)) + 1
        : 1

      this.tasks.push({ id: newId, text: trimmed, done: false, categoryId })
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },

    addCategory(name, color) {
      const trimmed = name.trim()
      if (!trimmed) return

      const newId = this.categories.length
        ? Math.max(...this.categories.map((c) => c.id)) + 1
        : 1

      this.categories.push({ id: newId, name: trimmed, color })
    },

    deleteCategory(id) {
      this.categories = this.categories.filter((c) => c.id !== id)

      // Aufgaben, die diese Kategorie nutzten, verlieren die Zuordnung
      this.tasks.forEach((task) => {
        if (task.categoryId === id) task.categoryId = null
      })
    },

    getCategoryById(id) {
      return this.categories.find((c) => c.id === id) || null
    },
  },

  persist: true,
})