import { createRouter, createWebHistory } from 'vue-router'
import { useToast } from 'vue-toastification'
import ContactPage from '@/pages/Contact/ContactPage.vue'
import ContactDetails from '@/pages/Contact/ContactDetails.vue'
import SignInPage from '@/pages/auth/SignInPage.vue'
import SignUpPage from '@/pages/auth/SignUpPage.vue'
import DashboardPage from '@/pages/analytics/DashboardPage.vue'
import { useAuthStore } from '@/store/auth'
import { RoutePath } from '@/types/RoutePath'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: RoutePath.HOME, redirect: RoutePath.CONTACT_LIST },
    { path: RoutePath.CONTACT_LIST, component: ContactPage, meta: { requiresAuth: true } },
    {
      path: RoutePath.CONTACT_DETAILS,
      component: ContactDetails,
      meta: { requiresAuth: true },
      props: true,
    },
    { path: RoutePath.SIGN_IN, component: SignInPage, meta: { guestOnly: true } },
    { path: RoutePath.SIGN_UP, component: SignUpPage, meta: { guestOnly: true } },
    { path: RoutePath.DASHBOARD, component: DashboardPage, meta: { requiresAuth: true } },
  ],
})

const toast = useToast()

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const isFirstVisit = !from.path || from.path === '/'

  if (to.meta.requiresAuth && !authStore.userSession) {
    if (!isFirstVisit) {
      toast.error('You must log In')
    }
    return '/sign-in'
  }

  if (to.meta.guestOnly && authStore.userSession) {
    if (!isFirstVisit) {
      toast.error('You are already signed in')
    }
    return '/'
  }
})

export default router
