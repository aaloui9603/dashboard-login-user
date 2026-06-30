<script setup>
import { useAuthStore } from '../stores/authStore';
const authStore = useAuthStore()
</script>

<template>
    <div class="placeholder">
        <h1>Dashboard</h1>
        <p>Eingeloggt als: {{ authStore.user?.name }} ({{ authStore.role }})</p>
        <p><em>User-View kommt noch in M8...</em></p>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/glass'; 
.placeholder {
    @include glass-teal; 
    margin: var(--spacing-md); 
    padding: var(--spacing-md); 
    color: var(--color-text-primary);
}
</style>