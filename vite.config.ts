import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  preview: {
    port: 4173,
    host: true
  },
  define: {
    // 환경변수 기본값 설정
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL || 'http://localhost:8080'
    ),
    'import.meta.env.VITE_MOCK': JSON.stringify(
      process.env.VITE_MOCK || '0'
    )
  }
})
