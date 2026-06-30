import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      { id: 1, text: 'Profil vervollständigen', done: true },
      { id: 2, text: 'Erste Projektübersicht durchlesen', done: true },
      { id: 3, text: 'Mit dem Team-Lead Rücksprache halten', done: false },
      { id: 4, text: 'Wöchentlichen Statusbericht einreichen', done: false },
    ],
  }),

  actions: {
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.done = !task.done
    },

    addTask(text) {
      const trimmed = text.trim()
      if (!trimmed) return

      const newId = this.tasks.length
        ? Math.max(...this.tasks.map((t) => t.id)) + 1
        : 1

      this.tasks.push({ id: newId, text: trimmed, done: false })
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },
  },

  persist: true,
})