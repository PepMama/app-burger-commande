import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import BasketView from '../views/BasketView.vue'
import ConfirmeCommande from '../views/ConfirmeCommande.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import ValidedCommandeView from '@/views/ValidedCommandeView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path:'/basket',
      name: 'basket',
      component: BasketView,
      meta: { requiresAuth: true }
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmeCommande,
      meta: { requiresAuth: true }
    },
    {
      path: '/valided',
      name: 'valided',
      component: ValidedCommandeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { username } = storeToRefs(userStore)

  if (to.path === '/login') {
    userStore.resetUsername()
    return next()
  }

  if (to.meta.requiresAuth && !username.value) {
    next('/login') // Redirection si pas connecté
  } else {
    next() // Laisse passer
  }
})

export default router
