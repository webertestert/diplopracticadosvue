import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Importaciones axios
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.mount('#app')
