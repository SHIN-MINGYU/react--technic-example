# 目次

- [一日目](#一日目)

## 一日目

### 1. vite を通じて PWA の構成を行う

- vite の plugin の一つである vite-plugin-pwa を利用する
- VitePWA という named export module を import して Vite 公式ウェブで説明してくれている VitePWA({ registerType: "autoUpdate" })というコードを vite の設定ファイルに plugins として挿入することで pwa menifast を生成し進入点を挿入しこれによってサービスワーカを生成し、Browser に登録することができる
- 参考 https://github.com/antfu/vite-plugin-pwa/blob/main/src/types.ts
- 私自分なりにまとめたサービスワーカ => https://blush-oregano-884.notion.site/59e2c2b87abc4d7faf43c24a44e82c60
- devOptions: {
  enabled: true
  }この設定で自動的にサービスワーカや manifest ファイルを作ることができる
  → workbox-build ライブラリを通じて build する

### 2. サービスワーカ構成

- application がオフラインにも動作できるように構成をしなければならない
- こうするため、application の全てのリソースを含めているサービスワーカの事前キャッシュ manifest ファイルを構成しなければならない

→ 基本的にサービスワーカにキャッシュストレージにどんなリソースを格納するかを network requests interception 知らせなければいけない

- 参考　https://developer.chrome.com/docs/workbox/caching-strategies-overview/#caching-strategies
- 過程
  1. application がサービスワーカを登録すればブラウザーはサービスワーカの事前キャッシュ manifest にある全てのリソースをダウンロードし設置を試す
  2. ブラウザーが全てのリソースをダウンロードしストレージに格納することでサービスワーカを活性化し、application をコントロールを試す
- vite-plugin-pwa は workbox-build ライブラリを利用するので manifest ファイルに css,js, html リソースしか含まれていない
- なので他のリソース形を含まる場合 VitePWA に workbox : {GlobalPattern : //ここ}にパータンを入力しなければならない

ex)

```
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})

```

### 3. PWA の最小要求事項

- 今までは最も基本的な PWA の構成方法でしたが、PWA の最小要求事項に充足するためにはもっと多いオプションを含まなければならない
