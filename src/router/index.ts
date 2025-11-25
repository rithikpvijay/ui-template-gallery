import { createRouter, createWebHistory } from 'vue-router'
import ContactDetails from '@/pages/Contact/ContactDetails.vue'
import ContactPage from '@/pages/Contact/ContactPage.vue'
import SignIn from '@/pages/auth/SignIn.vue'
import { RoutePath } from '@/types/RoutePath'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: RoutePath.HOME, redirect: RoutePath.CONTACT_LIST },
    { path: RoutePath.CONTACT_LIST, component: ContactPage },
    { path: RoutePath.CONTACT_DETAILS, component: ContactDetails, props: true },
    { path: RoutePath.SIGN_IN, component: SignIn },
  ],
})

export default router
