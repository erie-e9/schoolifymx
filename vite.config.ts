import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { viteImageToAVIFPlugin } from 'vite-image-to-avif-plugin'
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteImageToAVIFPlugin({}),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
    }),
    svgr({
      svgrOptions: {
        memo: true,
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true
      },
      // include: "**/*.svg",
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Schoolify.mx — Soluciones Escolares',
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:html|js|css)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'schoolify-content-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 48 * 60 * 60
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif|ico|avif)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'schoolify-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 48 * 60 * 60
              }
            }
          }
        ]
      },
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'Schoolify.mx — Soluciones Escolares',
        short_name: 'Schoolify.mx',
        description: 'Sitio oficial - Schoolify.mx',
        theme_color: '#ffffff',
        background_color: '#0F172A',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'splash_screens/icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@customHooks': path.resolve(__dirname, './src/hooks/customHooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@tests': path.resolve(__dirname, './src/tests'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    cssMinify: 'esbuild',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap', 'lucide-react'],
  },

})
