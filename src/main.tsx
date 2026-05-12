import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onOfflineReady() {
    console.log('[PWA] La aplicación está lista para usarse offline.')
  },
  onNeedRefresh() {
    // Esto es útil para mostrar un botón de "Nueva versión disponible"
    console.log('[PWA] Nueva versión disponible. Recarga para actualizar.')
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
