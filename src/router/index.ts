import { createRouter, createWebHistory } from 'vue-router'

import ContactDetails from '@/pages/Contact/ContactDetails.vue'
import ContactPage from '@/pages/Contact/ContactPage.vue'
import SignIn from '@/pages/auth/SignIn.vue'
import SignUp from '@/pages/auth/SignUp.vue'
import { useAuthStore } from '@/store/auth'
import { useToast } from 'vue-toastification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/contact-list', meta: { requiresAuth: true } },
    { path: '/contact-list', component: ContactPage, meta: { requiresAuth: true } },
    {
      path: '/contact-list/:id',
      component: ContactDetails,
      meta: { requiresAuth: true },
      props: true,
    },
    { path: '/sign-in', component: SignIn, meta: { guestOnly: true } },
    { path: '/sign-up', component: SignUp, meta: { guestOnly: true } },
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
