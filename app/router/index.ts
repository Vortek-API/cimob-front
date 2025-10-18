import { createRouter, createWebHistory } from "vue-router";
import Login from "~/pages/login.vue";
import Home from "~/pages/home.vue";
import { useAuthStore } from "~/store/authStore";

const routes = [
  { path: "/login", component: Login },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();

  // verifica se a rota precisa de autenticação
  if (to.meta.requiresAuth && !auth.isAuthenticated.valueOf) {
    next("/"); // redireciona para login
  } else {
    next(); // deixa passar
  }
});

export default router;
