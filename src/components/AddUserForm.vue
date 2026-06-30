<script setup>
import { ref } from 'vue'
import { useUserListStore } from '@/stores/userListStore'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter.vue'

const userListStore = useUserListStore()
const emit = defineEmits(['close'])

const name = ref('')
const email = ref('')
const role = ref('user')
const password = ref('')
const errorMessage = ref('')

function handleSubmit() {
  errorMessage.value = ''

  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Bitte alle Felder ausfüllen.'
    return
  }

  userListStore.addUser({
    name: name.value,
    email: email.value,
    role: role.value,
    status: 'active',
  })

  name.value = ''
  email.value = ''
  role.value = 'user'
  password.value = ''
  emit('close')
}
</script>

<template>
  <form class="add-user-form" @submit.prevent="handleSubmit">
    <h2>Neuen User anlegen</h2>

    <label for="new-name">Name</label>
    <input id="new-name" v-model="name" type="text" />

    <label for="new-email">E-Mail</label>
    <input id="new-email" v-model="email" type="email" />

    <label for="new-role">Rolle</label>
    <select id="new-role" v-model="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    <label for="new-password">Passwort</label>
    <input id="new-password" v-model="password" type="password" />
    <PasswordStrengthMeter :password="password" />

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div class="form-actions">
      <button type="submit">Anlegen</button>
      <button type="button" class="cancel" @click="$emit('close')">Abbrechen</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.add-user-form {
  @include glass-teal;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-width: 400px;

  h2 {
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    margin: 0 0 var(--spacing-xs);
  }

  label {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }

  input, select {
    background: var(--input-bg);
    border: 1px solid var(--color-teal-border);
    border-radius: var(--radius-sharp);
    padding: var(--input-padding-y) var(--input-padding-x);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);

    &:focus {
      outline: none;
      border-color: var(--color-teal-accent);
    }
  }

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-sm);
  }

  .form-actions {
    display: flex;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xs);

    button {
      flex: 1;
      padding: var(--button-padding-y);
      border-radius: var(--radius-pill);
      border: none;
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: var(--transition-fast);

      &[type='submit'] {
        background: var(--color-teal-accent);
        color: var(--color-teal-bg);

        &:hover {
          opacity: 0.85;
        }
      }

      &.cancel {
        background: transparent;
        border: 1px solid var(--color-teal-border);
        color: var(--color-text-primary);

        &:hover {
          background: var(--color-danger);
          border-color: var(--color-danger);
        }
      }
    }
  }
}
</style>