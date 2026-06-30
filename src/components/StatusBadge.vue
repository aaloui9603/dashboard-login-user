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
  padding: var(--badge-padding-y) var(--badge-padding-x);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  &.active {
    background: var(--color-success-bg);
    color: var(--color-success);
  }

  &.inactive {
    background: var(--color-danger-bg);
    color: var(--color-danger);
  }
}
</style>