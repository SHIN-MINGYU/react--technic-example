import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// pwaを構成するためのviteのplugin
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
  // VitePWA({ registerType: "autoUpdate" })
  //　これを通じてpwa menifastを生成し侵入点を挿入しサービスワーカを生成しブラウザーに登録できる
  // https://github.com/antfu/vite-plugin-pwa/blob/main/src/types.tsで参考できる
});
