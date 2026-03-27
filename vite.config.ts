import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// import { ngrok } from 'vite-plugin-ngrok'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), svgr(),
    //    ngrok({
    //   compression: true,
    //   authtoken: '2pHekMvnS5S75v3oiFFQICtQixf_5jGyJHcdXFXaPga1YL1pj',
    // })
  ],
})
