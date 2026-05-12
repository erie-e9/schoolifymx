# Reporte de Estado y Mejoras para la PWA de Schoolify.mx

Actualmente se ha implementado la base tecnológica para que la landing page funcione como PWA (Service Workers con Workbox, caché offline de 48 hrs y optimización de imágenes AVIF). Sin embargo, para que la PWA ofrezca una experiencia verdaderamente nativa y profesional a los usuarios, hacen falta los siguientes assets y configuraciones.

---

## 1. Assets Visuales Faltantes (Iconos y Splash Screens)

El archivo `manifest` actualmente solo cuenta con un icono básico de 192x192px. Para cumplir con los estándares de Google Chrome, Android y Apple iOS, se requiere:

- [ ] **Icono de Alta Resolución (512x512px)**: Obligatorio para la Google Play Store y dispositivos de alta densidad (formato PNG).
- [ ] **Icono Enmascarable (Maskable Icon)**: Un icono diseñado con márgenes especiales para que Android pueda redondearlo o darle forma de lágrima según la capa de personalización del usuario (`purpose: 'any maskable'`).
- [ ] **Icono específico para Apple (Apple Touch Icon)**: iOS no lee siempre el `manifest`. Necesitas un `<link rel="apple-touch-icon" href="apple-icon-180.png">` en tu `index.html`.
- [ ] **Splash Screens para iOS**: Imágenes que aparecen mientras la app carga en un iPhone/iPad. Se generan en varias resoluciones y se enlazan mediante etiquetas `<link rel="apple-touch-startup-image">`.

## 2. Capturas de Pantalla (Screenshots)

Para que el navegador muestre una tarjeta de instalación bonita e invite al usuario a instalar la app:
- [ ] **Screenshots Móviles y de Escritorio**: Debes incluir imágenes de la app funcionando dentro del `manifest` bajo la propiedad `screenshots`. 
  - Ejemplo: Capturas de la página mostrando la calculadora de uniformes o la lista de útiles.

## 3. Funciones y Metadatos en el Manifest

Faltan propiedades críticas en la configuración de `vite-plugin-pwa` (en `vite.config.ts`):

- [ ] `display: "standalone"` o `"fullscreen"`: Esto elimina la barra de búsqueda del navegador para que se vea como una app real.
- [ ] `start_url: "/"`: Le indica a la app en qué página iniciar cuando el usuario toca el icono.
- [ ] `background_color`: Color de fondo que se mostrará antes de que cargue el CSS.
- [ ] **Accesos directos (Shortcuts)**: Enlaces rápidos al dejar presionado el icono (ej. "Comprar Uniformes", "Ver Lista de Útiles").

## 4. Experiencia de Usuario (UX) y Lógica

- [ ] **Página de Fallback Offline (`offline.html`)**: Si el usuario entra sin internet a una sección que no ha visitado antes (y por ende no está en caché), el navegador mostrará el "Dinosaurio de Chrome". Necesitamos una vista personalizada que diga *"Parece que estás desconectado, pero Schoolify sigue aquí. Revisa tu conexión."*
- [ ] **Botón de Instalación Personalizado**: Capturar el evento de JavaScript `beforeinstallprompt` para mostrar un botón propio y estilizado en el menú o hero section que diga **"Instalar App de Schoolify"**.
- [ ] **Notificación de Actualización (Update Prompt)**: Actualmente el Service Worker está en modo `autoUpdate`. Es mejor un aviso visual (Toast/Snackbar) que diga *"Hay una nueva versión disponible, haz clic para actualizar"*, ya que las actualizaciones automáticas a veces rompen el estado del usuario si está a la mitad de una compra.

---

### Siguientes Pasos Recomendados:
1. Diseñar el logo principal en **512x512px** y pasarlo por una herramienta como *PWA Asset Generator* o *Maskable.app*.
2. Añadir las etiquetas meta para iOS en tu `index.html`.
3. Crear un componente en React para el *Update Prompt* y el *Install Button*.
