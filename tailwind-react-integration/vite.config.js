// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ✅ official Vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // enable the plugin
  ],
})
