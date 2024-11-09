import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.png'],
  manifest: {
    name: "Dialecto",
    short_name: "Dialecto",
    description: "An app that can teach you different dialects from the Philippines.",
    icons:[
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'favicon'
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'apple touch icon'
      },
      {
        src: "./favicon-16x16.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'any'
      },
      {
        src: "./favicon-32x32.png",
        sizes: "512x512",
        type: "image/png",
        purpose: 'icon'
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: '/dialecto',
    start_url: '/dialecto',
    orientation: "portrait",
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dialecto/",
  plugins: [react(), VitePWA({manifestForPlugin, registerType: 'autoUpdate'})]
})
