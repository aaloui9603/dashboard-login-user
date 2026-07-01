import { defineStore } from 'pinia'
import { MOCK_USER_LIST } from '../constants/mockUserList'
import { useAuthStore } from './authStore'

export const useUserListStore = defineStore('userList', {
    state: () => ({
        users: [...MOCK_USER_LIST],
    }),

    actions: {
        addUser({ name, email, role, status}) {
            const newId = this.users.length 
            ? Math.max(...this.users.map((u) => u.id)) + 1
            : 1

            this.users.push({ id: newId, name, email, role, status})
        },

        deleteUser(id) {
            const authStore = useAuthStore()
            const userToDelete = this.users.find((u) => u.id === id)

            if (!userToDelete) {
                return { success: false, message: 'User nicht gefunden.' }
            }

            if (userToDelete.email === authStore.user?.email) {
                return { success: false, message: 'Du kannst dich nicht selbst löschen.' }
            }

            this.users = this.users.filter((u) => u.id !== id)
            return { success: true }
        },

        changeUserRole(id, newRole) {
            const authStore = useAuthStore()
            const targetUser = this.users.find((u) => u.id === id)

            if (!targetUser) {
                return { success: false, message: 'User nicht gefunden.' }
            }

            if (
                targetUser.email === authStore.user?.email &&
                targetUser.role === 'admin' &&
                newRole !== 'admin'
            ) {
                return { success: false, message: 'Du kannst dir nicht selbst die Admin-Rolle entziehen.' }
            }

            targetUser.role = newRole
            return { success: true }
        },
    },

    persist: true
})