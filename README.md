# 目次

- [一日目](#一日目)

  - [1. vite を使って PWA の構成を行う](#strong1-vite-を通じて-pwa-の構成を行うstrong)
  - [2. サービスワーカ構成](#strong2-サービスワーカ構成strong)
  - [3.PWA の最小要求事項](#strong3-pwa-の最小要求事項strong)

- [二日目](#二日目)

  - [1. meterail ui のカスタムカラーを使うときのタイプ設定](#strong1-meterail-ui-のカスタムカラーを使うときのタイプ設定strong)
  - [2. ○○.d.ts を使ってみよう](#strong2-○○dts-を使ってみようstrong);
  - [3.typescript と一緒に jsdoc ということを使ってみよう](#strong3-typescript-と一緒に-jsdoc-ということを使ってみようstrong)

- [三日目](#三日目)

  - [1. useLayoutEffect を使って useEffect との差を調べてみよう](#strong1-uselayouteffect-を使って-useeffect-との差を調べてみようstrong)
  - [2. Custom Hook pattern](#strong2-custom-hook-patternstrong)

- [四日目](#四日目)

  - [1.generator 関数](#strong1-genarator-関数-strong)
  - [2.react-router-dom を使った-dynamic-routing](#strong-2-react-router-dom-を使った-dynamic-routingstrong)

- [五日目](#五日目)
  - [1.barrel-pattern](#strong1-barrel-patternabout-export-and-importstrong)
  - [2.compound-component-pattern](#strong-2-compound-component-patternstrong)
  - [3.error 発生(react-router-dom build error)](#strong-stylecolorrederror-発生-strong)

## <strong>一日目</strong>

### <strong>1. vite 使って PWA の構成を行う</strong>

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

# 四日目

### <strong>1. Genarator 関数 </strong>

- Genarator 関数とは？

  - async/await と一緒に不同期処理を同期みたいに扱えるように手伝う関数

- なんで Generator を使えばならないの？

  - 不同期てきな特性を同期的なコード方式で管理ができる

    async/await も実は Generator 基盤である

  - Iterator と Iterable を簡単に使えるようになる

  - Generator 関数はコルーチン特性を持っている

    ルーチンとは？

        コンピュータープログラムの一部であり、特定なことを実行するための命令

    サブルーチンとは？

        プログラミングでは関数の中に関数がある場合,中の関数をサブルーチンという

    コルーチンとは？

        ルーチンの種類を一つであり、活動ルーチンだといえる．
        サブルーチンの順次的な処理過程とは違って進入時点と脱出時点をyieldというキーワードを使ってカスタムできる
        オブジェクトがyield表現式を出会ったら、少しサスペンドされる同時に関数コンテックスをコピーし、コールスタックを抜け出す
        そこで、callerがnext()メッソドを呼ぶことによって保存していたスタックフレームが復元されそのコンテックスからresume実行を行う

    同時的な特性を持っている

        コルーチン形をうまく利用すればthreading programmingなしに同時的なプログラミングができる

    非同期的な特性持っている

    メモリ効率に寄与できる

        Lazy-Evalutionを通じ、いるときに値を求めて使い、メモリ管理を効率的にできる

### <strong> 2. react-router-dom を使った Dynamic Routing</strong>

- 参考 [Router.tsx](./src/Router.tsx)

  React.lazy と React.Suspense を利用し NEXT みたいな page フォルダーに paging 機能

# 五日目

### <strong>1. Barrel Pattern(about export and import)</strong>

- Barrel Pattern とは？

  一つのファイルで re-export し、import 構文の縮約することによってコードベースをもっときれいに管理できる Design Pattern である

  例 適用ファイル : [generator.tsx](./src/pages/javascript/generator.tsx)

  - Barrel Pattern を使わない場合

  ```
  import CodeContainer from "../../components/content/code";
  import Title from "../../components/content/Title";
  import Console from "../../components/content/console";
  ```

  -Barrel Pattern を使った場合

  ```
  import { CodeContainer, Title,Console } from "../../components/content";
  ```

このように同じ DIR にあるファイルをインポートするときに書けるパータンである

- 短所

  Tree shaking 問題が起こる可能性ある

  - Tree shaking は何？

    木を振って死んだ葉を落とすように、build するとき使用しないコードを削除することを意味する

  - 使用しないコードがあるため、code splitting がうまくできなくて、bundle のサイズがでかくなる
  - これによって性能問題が起こる可能性ある

### <strong> 2. Compound Component Pattern</strong>

- Compound Component Pattern とは？

  内部の state を共有し、お互いに相互作用する Component たちを内部 static Components にして、クライアントに内部ロジック抽象化し、
  これ以外のロジック作成を独立的に作成することを目的にするパータン

- Props Drilling 問題解決

  - PropsDrilling とは？
    -React のデータ流れを表す言葉であり、親から子に順次的に Props が行くことを意味する
    先ほど書いた通り下の component にデータ伝送を行う時に親 component を通さず直接データを渡せる

- Tree shaking が不可能であるため、条件によって変わる Component には不適合

  - 内部ロジックを共有するために、Provider Pattern を活用する

        Provider Pattern も活用してみたかったが、ロジック的に中身を共有するPropsがないため、下のリンクのファイルではProvider Patternがない

        でも、別々のだったComponentを一つのComponentにしたことで満足：）

  適用ファイル : [generator.tsx](./src/pages/javascript/generator.tsx)

### <strong style="color:red">Error 発生 </strong>

### <strong>３．Build したら paging がうまく作動しない</strong>

予想理由 :　 lazy でファイルの page をしたものの、build するときにはその経路にファイルがいないから paging 処理ができてない
