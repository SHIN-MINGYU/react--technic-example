import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// pwaを構成するためのviteのplugin
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: [
        "favicon.ico",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "Icon-512.png",
        "maskable_icon_x192.png",
        "apple-touch-icon.png",
        "android-chrome-96x96.png",
      ],
      manifest: {
        name: "React-Examples",
        short_name: "reactEx",
        description:
          "this project is example of react what use clean code and pratice more than react technic",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicon.ico",
          },
          {
            src: "/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable", //this is how to mask icon setting
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "apple-touch-icon.png",
            type: "image/png",
          },
          {
            src: "android-chrome-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  // VitePWA({ registerType: "autoUpdate" })
  //　これを通じてpwa menifastを生成し侵入点を挿入しサービスワーカを生成しブラウザーに登録できる
  // https://github.com/antfu/vite-plugin-pwa/blob/main/src/types.tsで参考できる
});
