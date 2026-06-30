<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

function handleSubmit() {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Bitte E-Mail und Passwort eingeben.'
    return
  }

  const result = authStore.loginWithCredentials(email.value, password.value)

  if (!result.success) {
    errorMessage.value = result.message
    return
  }

  router.push({ name: 'dashboard' })
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Willkommen zurück</h1>

      <form @submit.prevent="handleSubmit">
        <label for="email">E-Mail</label>
        <input id="email" v-model="email" type="email" autocomplete="username" />

        <label for="password">Passwort</label>
        <input id="password" v-model="password" type="password" autocomplete="current-password" />
        <PasswordStrengthMeter :password="password" />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit">Einloggen</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-aurora-bg);
  padding: var(--spacing-sm);
}

.login-card {
  @include glass-aurora;
  width: 100%;
  max-width: 360px;
  padding: var(--spacing-md);

  h1 {
    color: var(--color-text-primary);
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-sm);
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }

  input {
    background: var(--input-bg);
    border: 1px solid var(--color-aurora-border);
    border-radius: var(--radius-soft);
    padding: var(--input-padding-y) var(--input-padding-x);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);

    &:focus {
      outline: none;
      border-color: var(--color-aurora-accent);
    }
  }

  button {
    margin-top: var(--spacing-xs);
    background: var(--color-aurora-accent);
    color: var(--color-aurora-bg);
    border: none;
    border-radius: var(--radius-pill);
    padding: var(--button-padding-y);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: var(--transition-fast);

    &:hover {
      opacity: 0.85;
    }
  }

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-sm);
  }
}
</style>