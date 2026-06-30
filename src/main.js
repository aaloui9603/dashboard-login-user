import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // Hier wird das Plugin registiert. 

app.use(pinia)
app.mount('#app')

