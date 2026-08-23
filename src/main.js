import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AppIcon from './components/AppIcon.vue'

const app = createApp(App)

app.component('FontAwesomeIcon', AppIcon)
app.mount('#app')
