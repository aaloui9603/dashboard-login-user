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

        loginWithCredentials(email, password) {
            const foundUser = MOCK_USERS.find(
                (u) => u.email === email && u.password === password
            )

            if (!foundUser) {
                return { success: false, message: 'E-Mail oder Passwort ist falsch.'}
            }

            this.login(foundUser)
            return { success: true}
        },
    },

    persist: true,
})