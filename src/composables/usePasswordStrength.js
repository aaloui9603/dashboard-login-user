import { computed, unref } from 'vue'

export function usePasswordStrength(passwordSource) {
  const password = computed(() => unref(passwordSource))

  const hasMinLength = computed(() => password.value.length >= 8)
  const hasUppercase = computed(() => /[A-Z]/.test(password.value))
  const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value))

  const score = computed(() => {
    let s = 0
    if (hasMinLength.value) s++
    if (hasUppercase.value) s++
    if (hasSpecialChar.value) s++
    return s
  })

  const label = computed(() => {
    if (score.value <= 1) return 'schwach'
    if (score.value === 2) return 'mittel'
    return 'stark'
  })

  return { hasMinLength, hasUppercase, hasSpecialChar, score, label }
}