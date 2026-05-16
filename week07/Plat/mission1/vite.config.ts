import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react() as unknown as PluginOption,
    tailwindcss() as unknown as PluginOption,
  ],
})
