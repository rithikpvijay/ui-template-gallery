import { createRouter, createWebHistory } from 'vue-router'

import ContactDetails from '@/pages/Contact/ContactDetails.vue'
import ContactPage from '@/pages/Contact/ContactPage.vue'
import SignIn from '@/pages/auth/SignIn.vue'
import SignUp from '@/pages/auth/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/contact-list' },
    { path: '/contact-list', component: ContactPage },
    { path: '/contact-list/:id', component: ContactDetails, props: true },
    { path: '/sign-in', component: SignIn },
    { path: '/sign-up', component: SignUp },
  ],
})

export default router
