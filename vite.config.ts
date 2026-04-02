import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  base: '/schoolifymx/',
  plugins: [react(), svgr()],
  build: {
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {}
    }
  }
})
