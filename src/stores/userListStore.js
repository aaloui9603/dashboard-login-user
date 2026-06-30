import { defineStore } from 'pinia'
import { MOCK_USER_LIST } from '../constants/mockUserList'

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
    },

    persist: true
})