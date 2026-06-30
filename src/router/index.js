import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminView from '../views/AdminView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
    { path: '/login', name: 'login', component: LoginView},
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true} }, 
    { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAuth: true, role: 'admin'} },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    { path: '/', redirect: '/login' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore()

    // "Tür" verlangt Login, keiner ist eingeloggt also zurück zum Login
    if(to.meta.requiresAuth && !authStore.isLoggedIn) {
        return { name: 'login' }
    }

    //Tür verlangt bestimmte Rolle, die nicht passt, also zurück zum Dashboard
    if(to.meta.role && to.meta.role !== authStore.role) {
        return { name: 'dashboard'}
    }
})

export default router
