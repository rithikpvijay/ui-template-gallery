import ContactPage from '@/pages/Contact/ContactPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/contact-list' },
    { path: '/contact-list', component: ContactPage },
  ],
})

export default router
