import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    open: true,
    hmr: {
      overlay: true
    },
    proxy: {
      '/login': 'http://localhost:3002',
      '/users': 'http://localhost:3002',
      '/tasks': 'http://localhost:3002',
      '/urls': 'http://localhost:3002',
      '/recuperar': 'http://localhost:3002',
      '/generar-contraseña': 'http://localhost:3002'
    }
  }
})
