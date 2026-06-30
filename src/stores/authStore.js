import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null, 
        role: null,
        isLoggedIn: false,
    }),

    actions: {
        login(userData) {
            this.user = { name: userData.name, email: userData.email }
            this.role = userData.role 
            this.isLoggedIn = true; 
        },

        logout() {
            this.user = null; 
            this.role = null; 
            this.isLoggedIn = false;
        },
    },

    persist: true,
})