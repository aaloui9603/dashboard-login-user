import { defineStore } from 'pinia'
import { MOCK_USERS } from '../constants/mockUsers'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        role: null,
        isLoggedIn: false,

        // 2-Faktor-Authentifizierung Zwischenzustand
        pendingUser: null,
        pending2FA: false,
        generatedCode: null,
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
            this.clearPending2FA();
        },

        loginWithCredentials(email, password) {
            const foundUser = MOCK_USERS.find(
                (u) => u.email === email && u.password === password
            )

            if (!foundUser) {
                return { success: false, message: 'E-Mail oder Passwort ist falsch.'}
            }

            this.pendingUser = foundUser
            this.pending2FA = true
            this.generatedCode = this.generateCode()

            return { success: true, requires2FA: true, code: this.generatedCode }
        },

        generateCode() {
            return String(Math.floor(100000 + Math.random() * 900000))
        },

        resendCode() {
            if (!this.pending2FA) return null
            this.generatedCode = this.generateCode()
            return this.generatedCode
        },

        verifyCode(inputCode) {
            if (!this.pending2FA || !this.pendingUser) {
                return { success: false, message: 'Keine 2-Faktor-Verifizierung ausstehend.' }
            }

            if (inputCode !== this.generatedCode) {
                return { success: false, message: 'Falscher Code. Bitte erneut versuchen.' }
            }

            this.login(this.pendingUser)
            this.clearPending2FA()
            return { success: true }
        },

        clearPending2FA() {
            this.pendingUser = null
            this.pending2FA = false
            this.generatedCode = null
        },

        changePassword(currentPassword, newPassword) {
            const foundUser = MOCK_USERS.find((u) => u.email === this.user?.email)

            if(!foundUser) {
                return { success: false, message: 'User nicht gefunden.'}
            }

            if (foundUser.password !== currentPassword) {
                return { success: false, message: 'Aktuelles Passwort ist falsch.'}
            }

            if (newPassword === currentPassword) {
                return { success: false, message: 'Achtung, das neue Passwort muss vom alten unterschieden werden!'}
            }

            foundUser.password = newPassword
            return { success: true} 
        }
    },

    persist: true,
})