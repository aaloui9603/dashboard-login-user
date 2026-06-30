import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './assets/styles/main.scss'
import router from './router/index.js'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // Hier wird das Plugin registiert. 

app.use(pinia)
app.use(router)
app.mount('#app')

