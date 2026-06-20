import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/login': 'http://localhost:3001',
      '/users': 'http://localhost:3001',
      '/tasks': 'http://localhost:3001',
      '/urls': 'http://localhost:3001',
      '/recuperar': 'http://localhost:3001',
      '/generar-contraseña': 'http://localhost:3001'
    }
  }
})
