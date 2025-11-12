import { createRouter, createWebHistory } from 'vue-router'
import ContactDetails from '@/pages/Contact/ContactDetails.vue'
import ContactPage from '@/pages/Contact/ContactPage.vue'
import SignIn from '@/pages/auth/SignIn.vue'
import SignUp from '@/pages/auth/SignUp.vue'
import { RoutePath } from '@/types/RoutePath'
import { useAuthStore } from '@/store/auth'
import { useToast } from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: RoutePath.HOME, redirect: RoutePath.CONTACT_LIST, meta: { requiresAuth: true } },
    { path: RoutePath.CONTACT_LIST, component: ContactPage, meta: { requiresAuth: true } },
    {
      path: RoutePath.CONTACT_DETAILS,
      component: ContactDetails,
      meta: { requiresAuth: true },
      props: true,
    },
    { path: RoutePath.SIGN_IN, component: SignIn, meta: { guestOnly: true } },
    { path: RoutePath.SIGN_UP, component: SignUp, meta: { guestOnly: true } },
  ],
})

const toast = useToast()

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.userSession) {
    toast.error('You must log In')
    return RoutePath.SIGN_IN
  }

  if (to.meta.guestOnly && authStore.userSession) {
    toast.error('You are already signed in')
    return RoutePath.HOME
  }
})

export default router
