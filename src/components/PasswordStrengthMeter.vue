<script setup>
import { toRef } from 'vue'
import { usePasswordStrength } from '@/composables/usePasswordStrength'

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
})

const passwordRef = toRef(props, 'password')
const { hasMinLength, hasUppercase, hasSpecialChar, score, label } = usePasswordStrength(passwordRef)
</script>

<template>
  <div v-if="password" class="strength-meter">
    <div class="bar-track">
      <div class="bar-fill" :class="label" :style="{ width: (score / 3) * 100 + '%' }"></div>
    </div>
    <p class="label" :class="label">Stärke: {{ label }}</p>
    <ul class="rules">
      <li :class="{ met: hasMinLength }">{{ hasMinLength ? '✓' : '○' }} Mindestens 8 Zeichen</li>
      <li :class="{ met: hasUppercase }">{{ hasUppercase ? '✓' : '○' }} Großbuchstabe</li>
      <li :class="{ met: hasSpecialChar }">{{ hasSpecialChar ? '✓' : '○' }} Sonderzeichen</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.strength-meter {
  margin-top: var(--spacing-xs);
}

.bar-track {
  width: 100%;
  height: var(--strength-bar-height);
  border-radius: var(--radius-pill);
  background: var(--input-bg);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width var(--transition-base), background var(--transition-base);

  &.schwach { background: var(--color-danger); }
  &.mittel { background: var(--color-warning); }
  &.stark { background: var(--color-success); }
}

.label {
  font-size: var(--font-size-xs);
  margin: var(--spacing-xs) 0 0;
  text-transform: capitalize;

  &.schwach { color: var(--color-danger); }
  &.mittel { color: var(--color-warning); }
  &.stark { color: var(--color-success); }
}

.rules {
  list-style: none;
  padding: 0;
  margin: var(--spacing-xs) 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  li {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);

    &.met {
      color: var(--color-success);
    }
  }
}
</style>