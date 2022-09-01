# 目次

- [一日目](#一日目)
- [二日目](#二日目)

## <strong>一日目</strong>

### <strong>1. vite を通じて PWA の構成を行う</strong>

- vite の plugin の一つである vite-plugin-pwa を利用する
- VitePWA という named export module を import して Vite 公式ウェブで説明してくれている VitePWA({ registerType: "autoUpdate" })というコードを vite の設定ファイルに plugins として挿入することで pwa menifast を生成し進入点を挿入しこれによってサービスワーカを生成し、Browser に登録することができる
- 参考 https://github.com/antfu/vite-plugin-pwa/blob/main/src/types.ts
- 私自分なりにまとめたサービスワーカ => https://blush-oregano-884.notion.site/59e2c2b87abc4d7faf43c24a44e82c60
- devOptions: {
  enabled: true
  }この設定で自動的にサービスワーカや manifest ファイルを作ることができる
  → workbox-build ライブラリを通じて build する

### <strong>2. サービスワーカ構成</strong>

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

### <strong>3. PWA の最小要求事項</strong>

- 今までは最も基本的な PWA の構成方法でしたが、PWA の最小要求事項に充足するためにはもっと多いオプションを含まなければならない

- PWA 設置のためには application 進入点を修正し、最小の項目を追加し、Web App Menifast 検索エンジンが全てのページをクロリングするように許可するように構成すること

最小項目

### 進入時点

```
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>My Awesome App</title>
  <meta name="description" content="My Awesome App description">
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF">
  <meta name="theme-color" content="#ffffff">
</head>

```

### Web App Manifest

```
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})

```

アイコンセットを作る時に有用なサイト
https://realfavicongenerator.net/

# 二日目

### <strong>1. meterail ui のカスタムカラーを使うときのタイプ設定</strong>

- 参考 [createPallete.d.ts](./src/types/createPallete.d.ts)

### <strong>2. ○○.d.ts を使ってみよう</strong>

- 理由

  - タイプ名がとても長くて別のファイルに定義し保存するとき
  - タイプ reference を作りたいとき
  - グローバルモヂュールにしたいとき
  - 最も根本的な理由は前からいた js サードパーティーモヂュールたちを ts 環境で使えるように作ったらしい

  - .d.ts ファイルの中にはタイプの宣言のみ

    具現がない宣言を ambient と言いますが、こんな宣言が.d.ts ファイルに入るという

    そして decalre といったキーワードを通じコンパイラーに該当の変数や関数の存在を知らせるという

### <strong>3. typescript と一緒に jsdoc ということを使ってみよう</strong>

- JSDOC とは？

  - ドキュメントないのコメントをコードと一緒にソースコード追加できることが特徴
  - 主になる目的は JavaScript App または、ライブラリ API をドキュメント化すること
  - 各コメントは/\*\*sequence で始まることでパーサーが認識できる

- 何ができる？

  - API ドキュメント生成

  - タイプ推論

  - BUG FIX REPORT

- 基本的な使い方

  - @author

    コード作成者の情報がいる場合使うコード
    ex

    ```
    /**
    * @author <name>
    * @author <name> [<emailAddress>]
    */

    ```

  - @license

    オープンソースライブライ identifier

  - @constant (@const)

    constant ということを表す

    ex

    ```
    /**
    * @constant [<type> <name>]
    */
    ```

  - @description

        コードの説明を行う


        ex

        ```
        // @description <some description>
        ```

  - @throws

    エラー情報や Exception を表示

    ex

    ```
    // @throws free-form description
    // @throws {<type>}
    // @throws {<type>} free-form description

    ```

  - @type

    このタグを使用しタイプの名前を参考できる

    ```
    /**
    * @type {string}
    */
    ```

  - @param

    @type タグと同じくタイプ構文である.

    しかし関数のパラメーターに使うことができる．

    パラメーターは名前に大カッコをつけることで選択的なパラメーターということをしれ知らせることができる

    ex

    ```
    /**
    * @param {string}  p1 -> 普通のパラメーター
    * @param {string} [p2="test"] -> 選択的なパラメーター
    */
    ```

  - @return

    使い方は@param と同じ．しかし、これは関数などの return タイプを定義するときに使う

    ex

    ```
    /**
    * @returns {{ a: string, b: number }} -> return であれ　returnsであれ同じ
    */
    ```

  - @typedef

    複雑なタイプを定義するときに使う．使い方は param と似てる

    ex

    ```
    /**
    * @typedef {Object} SpecialType - 新しいオブジェクト生成
    * @property {string} prop1 - オブジェクトの文字列プロパティ
    * @property {number} prop2 - オブジェクトの数字プロパティ
    * @property {number=} prop3 - オブジェクトの選択的な数字プロパティ
    */

    /** @type {SpecialType1} */
    var specialTypeObject1;

    ```

  - @callback

    @typedef と似てる、しかしこれは特定 Object ではなく function タイプを指定する

    ```
    /**
    * @callback Predicate
    * @param {string} data
    * @param {number} [index]
    * @returns {boolean}
    */

    /** @type {Predicate} */
    const ok = (s) => !(s.length % 2);
    ```

  - @template

    ゼネリックタイプの定義可能

    ```
    /**
    * @template T
    * @param {T}
    * @return {T}
    */
    ```

    色々あるが残ったタグが使う度にここに書こう‼

# 三日目

### <strong>1. useLayoutEffect を使って useEffect との差を調べてみよう</strong>

- useEffect とは？

  - 既存クラス形のライフルサイクル関数を hooksStyle で使えるように react から基本的に提供してくれている hooks
  - 役割
    - componentDidMount, componentDidUpdate, componentWillUnMount
    - といったライフルサイクルを代替
    - レンダリング後に呼ばれるので state がこの effect に依存したら不便な UX を提供する可能性あり
    - 主にデータやり取りや subscribe 設定をするとき、また直接 DOM をコントロールするときに使うことができる

- では useLayoutEffect は？
  - 基本的に動作は useEffect と同じ
  - しかし、レンダリング後に呼ばれる useEffect と違って画面にレンダリングする前に呼ばれるので直接 DOM をコントロールするコードがあってもクライアントは不便な UX を経験しないことができる
  - useLayoutEffect は同期的に実行されるので中身が全部実行されないと、画面が書かれるないのでロジックが複雑な場合はクライアントが Layout を見るまでの時間が長くなる可能性があり、できれば useEffect を使ったほうが良い

### <strong>2. Custom Hook pattern</strong>

- 適用したファイル [DrawerListCreator.tsx](./src/components/Layouts/Drawer/DrawerListCreator.tsx)

- メインロジックがカスタムフックに渡され、ロジックを View と離せることができる
- 色々な内部のロジックを漏出しながら Components のコントロールがしやすくなる

長所

- 使用者はフックと Components の間で自分のロジックを挿入し、基本 Components の動作をもっと深くコントロールできる

短所

- ロジックが View と分離されてあり、この二つをつなげるのは使用者次第である
- Components をコントロールするには Components の動作方式の深い理解がいる
