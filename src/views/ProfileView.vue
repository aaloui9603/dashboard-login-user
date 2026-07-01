<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter.vue'

const authStore = useAuthStore()
const toast = useToast()

const showPasswordForm = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const fileInput = ref(null)
const imageError = ref('')

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 1 * 1024 * 1024 // 1 MB

function togglePasswordForm() {
  showPasswordForm.value = !showPasswordForm.value
  errorMessage.value = ''
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

function handleChangePassword() {
  errorMessage.value = ''

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    errorMessage.value = 'Bitte alle Felder ausfüllen.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Neue Passwörter stimmen nicht überein.'
    return
  }

  const result = authStore.changePassword(currentPassword.value, newPassword.value)

  if (!result.success) {
    errorMessage.value = result.message
    return
  }

  toast.success('Passwort erfolgreich geändert!')
  togglePasswordForm()
}

function triggerFileInput() {
  fileInput.value?.click()
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden.'))
    reader.readAsDataURL(file)
  })
}

async function handleImageChange(event) {
  imageError.value = ''
  const file = event.target.files[0]

  if (!file) {
    return
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    imageError.value = 'Nur JPEG, PNG oder WebP erlaubt.'
    event.target.value = ''
    return
  }

  if (file.size > MAX_SIZE_BYTES) {
    imageError.value = 'Bild ist zu groß. Maximal 1 MB erlaubt.'
    event.target.value = ''
    return
  }

  try {
    const base64 = await fileToBase64(file)
    authStore.updateProfileImage(base64)
    toast.success('Profilbild aktualisiert!')
  } catch (err) {
    imageError.value = err.message
  }

  event.target.value = ''
}

function handleRemoveImage() {
  authStore.removeProfileImage()
  toast.info('Profilbild entfernt.')
}
</script>

<template>
  <div class="profile-view">
    <h1>Mein Profil</h1>

    <div class="profile-card">
      <div class="avatar-wrapper">
        <img
          v-if="authStore.profileImage"
          :src="authStore.profileImage"
          alt="Profilbild"
          class="avatar-large avatar-image"
        />
        <div v-else class="avatar-large">{{ authStore.user?.name?.charAt(0) }}</div>

        <div class="avatar-actions">
          <button type="button" class="avatar-btn" @click="triggerFileInput">
            Bild ändern
          </button>
          <button
            v-if="authStore.profileImage"
            type="button"
            class="avatar-btn avatar-btn-remove"
            @click="handleRemoveImage"
          >
            Entfernen
          </button>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          class="hidden-input"
          @change="handleImageChange"
        />

        <p v-if="imageError" class="error">{{ imageError }}</p>
      </div>

      <dl class="profile-details">
        <dt>Name</dt>
        <dd>{{ authStore.user?.name }}</dd>

        <dt>E-Mail</dt>
        <dd>{{ authStore.user?.email }}</dd>

        <dt>Rolle</dt>
        <dd class="role-value">{{ authStore.role }}</dd>
      </dl>
    </div>

    <button class="toggle-btn" @click="togglePasswordForm">
      {{ showPasswordForm ? 'Abbrechen' : 'Passwort ändern' }}
    </button>

    <div v-if="showPasswordForm" class="password-card">
      <h2>Passwort ändern</h2>

      <form @submit.prevent="handleChangePassword">
        <label for="currentPassword">Aktuelles Passwort</label>
        <input
          id="currentPassword"
          v-model="currentPassword"
          type="password"
          autocomplete="current-password"
        />

        <label for="newPassword">Neues Passwort</label>
        <input
          id="newPassword"
          v-model="newPassword"
          type="password"
          autocomplete="new-password"
        />
        <PasswordStrengthMeter :password="newPassword" />

        <label for="confirmPassword">Neues Passwort bestätigen</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
        />

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit">Speichern</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/_glass.scss';

.profile-view {
  h1 {
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }
}

.profile-card {
  @include glass-teal;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  max-width: 480px;
  width: 100%;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;
  width: 110px;
}

.avatar-large {
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: var(--radius-pill);
  background: var(--color-teal-accent);
  color: var(--color-teal-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.avatar-image {
  object-fit: cover;
}

.avatar-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.avatar-btn {
  background: transparent;
  color: var(--color-teal-accent);
  border: 1px solid var(--color-teal-accent);
  border-radius: var(--radius-pill);
  padding: 4px var(--spacing-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-fast);

  &:hover {
    opacity: 0.85;
  }
}

.avatar-btn-remove {
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.hidden-input {
  display: none;
}

.avatar-wrapper .error {
  text-align: center; 
  font-size: var(--font-size-sm);
  word-break: break-word;
}

.profile-details {
  flex: 1; 
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-xs) var(--spacing-sm);
  margin: 0;
  min-width: 0;

  dt {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    white-space: nowrap;
  }

  dd {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    margin: 0;
    overflow-wrap: break-word;
    min-width: 0;
  }

  .role-value {
    color: var(--color-teal-accent);
    text-transform: capitalize;
  }
}

.toggle-btn {
  margin-top: var(--spacing-md);
  background: transparent;
  color: var(--color-teal-accent);
  border: 1px solid var(--color-teal-accent);
  border-radius: var(--radius-pill);
  padding: var(--button-padding-y) var(--spacing-md);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: var(--transition-fast);

  &:hover {
    opacity: 0.85;
  }
}

.password-card {
  @include glass-teal;
  margin-top: var(--spacing-md);
  padding: var(--spacing-lg);
  max-width: 480px;
  width: 100%;

  h2 {
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
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
    border: 1px solid var(--color-teal-accent);
    border-radius: var(--radius-soft);
    padding: var(--input-padding-y) var(--input-padding-x);
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);

    &:focus {
      outline: none;
      border-color: var(--color-teal-accent);
    }
  }

  button[type='submit'] {
    margin-top: var(--spacing-xs);
    background: var(--color-teal-accent);
    color: var(--color-teal-bg);
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

// ===== Mobile: weniger Padding, Avatar oberhalb der Details =====
@media (max-width: 480px) {
  .profile-card {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-sm);
    gap: var(--spacing-sm);
  }
}
</style>