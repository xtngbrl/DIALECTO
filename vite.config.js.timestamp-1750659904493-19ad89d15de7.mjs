// vite.config.js
import { defineConfig } from "file:///F:/DIALECTO/node_modules/vite/dist/node/index.js";
import react from "file:///F:/DIALECTO/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///F:/DIALECTO/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.png"],
  manifest: {
    name: "Dialecto",
    short_name: "Dialecto",
    description: "An app that can teach you different dialects from the Philippines.",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "./favicon-16x16.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "./favicon-32x32.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "icon"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
var vite_config_default = defineConfig({
  base: "/",
  plugins: [react(), VitePWA({ manifestForPlugin, registerType: "autoUpdate" })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxESUFMRUNUT1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcRElBTEVDVE9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L0RJQUxFQ1RPL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5cclxuY29uc3QgbWFuaWZlc3RGb3JQbHVnaW4gPSB7XHJcbiAgcmVnaXN0ZXJUeXBlOiBcInByb21wdFwiLFxyXG4gIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5pY28nLCAnYXBwbGUtdG91Y2gtaWNvbi5wbmcnLCAnbWFza2VkLWljb24ucG5nJ10sXHJcbiAgbWFuaWZlc3Q6IHtcclxuICAgIG5hbWU6IFwiRGlhbGVjdG9cIixcclxuICAgIHNob3J0X25hbWU6IFwiRGlhbGVjdG9cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFuIGFwcCB0aGF0IGNhbiB0ZWFjaCB5b3UgZGlmZmVyZW50IGRpYWxlY3RzIGZyb20gdGhlIFBoaWxpcHBpbmVzLlwiLFxyXG4gICAgaWNvbnM6W1xyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiBcIi4vYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiBcIi4vYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmdcIixcclxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICBwdXJwb3NlOiAnZmF2aWNvbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogXCIvYXBwbGUtdG91Y2gtaWNvbi5wbmdcIixcclxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICBwdXJwb3NlOiAnYXBwbGUgdG91Y2ggaWNvbidcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogXCIuL2Zhdmljb24tMTZ4MTYucG5nXCIsXHJcbiAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgcHVycG9zZTogJ2FueSdcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogXCIuL2Zhdmljb24tMzJ4MzIucG5nXCIsXHJcbiAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgcHVycG9zZTogJ2ljb24nXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxyXG4gICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZmZmZmZmXCIsXHJcbiAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuICAgIHNjb3BlOiAnLycsXHJcbiAgICBzdGFydF91cmw6ICcvJyxcclxuICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXHJcbiAgfVxyXG59XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IFwiL1wiLFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBWaXRlUFdBKHttYW5pZmVzdEZvclBsdWdpbiwgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZSd9KV1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1TixTQUFTLG9CQUFvQjtBQUNwUCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBRXhCLElBQU0sb0JBQW9CO0FBQUEsRUFDeEIsY0FBYztBQUFBLEVBQ2QsZUFBZSxDQUFDLGVBQWUsd0JBQXdCLGlCQUFpQjtBQUFBLEVBQ3hFLFVBQVU7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLE9BQU07QUFBQSxNQUNKO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2Isa0JBQWtCO0FBQUEsSUFDbEIsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLEVBQ2Y7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxFQUFDLG1CQUFtQixjQUFjLGFBQVksQ0FBQyxDQUFDO0FBQzdFLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
