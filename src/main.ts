import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import BaseIcon from './components/UI/BaseIcon.vue'
import BaseSearchBar from './components/UI/BaseSearchBar.vue'
import BaseMenu from './components/UI/BaseMenu.vue'
import BaseForm from './components/UI/BaseForm.vue'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './store/auth'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

const options = {
  position: 'top-center',
  timeout: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

app.use(Toast, options)

app.component('base-icon', BaseIcon)

app.component('base-search-bar', BaseSearchBar)

app.component('base-menu', BaseMenu)

app.component('base-form', BaseForm)

const authStore = useAuthStore()
await authStore.initAuth()

app.use(router)

app.mount('#app')
