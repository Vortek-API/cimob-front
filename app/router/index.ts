import { createRouter, createWebHistory } from 'vue-router'
import Login from '~/pages/login.vue'
import Home from '~/pages/home.vue'
import { useAuthStore } from '~/store/authStore'

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/dashboard', component: Home, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated.valueOf) {
    next('/login') // redireciona pro login
  } else {
    next() // deixa passar
  }
})

export default router
