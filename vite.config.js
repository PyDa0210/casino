import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Asegúrate de que Netlify apunte a 'dist'
  },
  base: '/', // Configuración para el dominio raíz
})
