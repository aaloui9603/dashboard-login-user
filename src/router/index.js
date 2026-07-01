import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import LoginView from '../views/LoginView.vue'
import TwoFactorView from '../views/TwoFactorView.vue'
import AppLayout from '../layouts/AppLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminView from '../views/AdminView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/2fa-verify', name: '2fa-verify', component: TwoFactorView, meta: { requires2FA: true } },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'admin', name: 'admin', component: AdminView, meta: { role: 'admin' } },
      { path: 'profile', name: 'profile', component: ProfileView },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  // "Tür" verlangt Login, keiner ist eingeloggt also zurück zum Login
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  }

  // "Tür" verlangt ausstehende 2FA-Verifizierung, die nicht vorliegt -> zurück zum Login
  if (to.meta.requires2FA && !authStore.pending2FA) {
    return { name: 'login' }
  }

  // Tür verlangt bestimmte Rolle, die nicht passt, also zurück zum Dashboard
  if (to.meta.role && to.meta.role !== authStore.role) {
    return { name: 'dashboard' }
  }
})

export default router