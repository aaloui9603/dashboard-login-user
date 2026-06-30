<script setup>
defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['active', 'inactive'].includes(value),
  },
})
</script>

<template>
  <span class="badge" :class="status">
    {{ status === 'active' ? 'Aktiv' : 'Inaktiv' }}
  </span>
</template>

<style lang="scss" scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  &.active {
    background: rgba(16, 185, 129, 0.15);
    color: var(--color-success);
  }

  &.inactive {
    background: rgba(239, 68, 68, 0.15);
    color: var(--color-danger);
  }
}
</style>