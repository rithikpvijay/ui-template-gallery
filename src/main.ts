import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BaseIcon from './components/UI/BaseIcon.vue'
import BaseSearchBar from './components/UI/BaseSearchBar.vue'
import BaseMenu from './components/UI/BaseMenu.vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)

app.component('base-icon', BaseIcon)

app.component('base-search-bar', BaseSearchBar)

app.component('base-menu', BaseMenu)

app.mount('#app')
