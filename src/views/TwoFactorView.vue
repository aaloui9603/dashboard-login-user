<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const code = ref('')
const errorMessage = ref('')

function handleVerify() {
  errorMessage.value = ''

  if (!code.value) {
    errorMessage.value = 'Bitte gib den Bestätigungscode ein.'
    return
  }

  const result = authStore.verifyCode(code.value)

  if (!result.success) {
    errorMessage.value = result.message
    return
  }

  toast.success('Erfolgreich verifiziert!')
  router.push({ name: 'dashboard' })
}

function handleResend() {
  const newCode = authStore.resendCode()

  if (!newCode) {
    errorMessage.value = 'Keine Verifizierung ausstehend. Bitte erneut einloggen.'
    return
  }

  toast.info(`Neuer Bestätigungscode: ${newCode}`, { timeout: 8000 })
}
</script>

<template>
  <div class="tfa-page">
    <div class="tfa-card">
      <h1>Bestätigungscode eingeben</h1>
      <p class="hint">Wir haben dir einen 6-stelligen Code gesendet.</p>

      <form @submit.prevent="handleVerify">
        <label for="code">Code</label>
        <input
          id="code"
          v-model="code"
          type="text"
          inputmode="numeric"
          maxlength="6"
          autocomplete="one-time-code"
        />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit">Bestätigen</button>
        <button type="button" class="resend" @click="handleResend">
          Code erneut senden
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.tfa-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-aurora-bg);
  padding: var(--spacing-sm);
}

.tfa-card {
  @include glass-aurora;
  width: 100%;
  max-width: 360px;
  padding: var(--spacing-md);

  h1 {
    color: var(--color-text-primary);
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xs);
    text-align: center;
  }

  .hint {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    text-align: center;
    margin-bottom: var(--spacing-sm);
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
    text-align: center;
    letter-spacing: 0.3em;

    &:focus {
      outline: none;
      border-color: var(--color-aurora-accent);
    }
  }

  button {
    margin-top: var(--spacing-xs);
    border: none;
    border-radius: var(--radius-pill);
    padding: var(--button-padding-y);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    transition: var(--transition-fast);
  }

  button[type='submit'] {
    background: var(--color-aurora-accent);
    color: var(--color-aurora-bg);

    &:hover {
      opacity: 0.85;
    }
  }

  .resend {
    background: transparent;
    color: var(--color-aurora-accent);
    border: 1px solid var(--color-aurora-border);

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