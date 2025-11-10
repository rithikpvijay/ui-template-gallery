import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'
import App from './App.vue'
import BaseIcon from './components/UI/BaseIcon.vue'
import BaseSearchBar from './components/UI/BaseSearchBar.vue'
import BaseMenu from './components/UI/BaseMenu.vue'
import BaseForm from './components/UI/BaseForm.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

app.use(router)

const options = {
  position: 'top-center',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

app.use(Toast, options)

app.component('base-icon', BaseIcon)

app.component('base-search-bar', BaseSearchBar)

app.component('base-menu', BaseMenu)

app.component('base-form', BaseForm)

app.mount('#app')
