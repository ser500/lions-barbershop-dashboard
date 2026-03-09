import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useAuth } from './composables/useAuth.js'
import './style.css'
import '@phosphor-icons/web/regular'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Lazy-load ApexCharts — only registers once the charts chunk is needed
import('vue3-apexcharts').then(({ default: VueApexCharts }) => {
  app.use(VueApexCharts)
})

app.mount('#app')

// Start listening for auth state changes globally
const { initAuth } = useAuth()
initAuth()
