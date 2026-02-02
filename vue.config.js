import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Portfolio-Card', // <--- DODAJ TĘ LINIJKĘ (zastąp nazwą swojego repo)
    plugins: [vue()],
})