# 概要
Xで特定のユーザのメディアを自動で保存し続けるスクリプトです。

# 使い方
1. 拡張機能はOFFにしておく
2. ユーザを画像フィルタ付きでを検索
    ```
    from:@<username> since:2015-01-01 until:2025-01-31 filter:images
    ```
3. 拡張機能をONにして検索結果ページをリロードすると自動で保存が開始される
4. Xの制限なのか、ある程度無限スクロールするとエラーが発生する。  
   一定期間検索できなくなるので、ある程度待機したあとに最後のポストの投稿日時以前から再検索するとよい。

# 使用上の注意
- 投稿が続いているのに自動スクロールが止まる場合は手動でスクロールしてください。

<details>
<summary>Template README</summary>
# Vue 3 Chrome拡張開発用テンプレート
- Vue 3でChome拡張を開発するためのテンプレートリポジトリです。
## 構成
Vite + crxjs + Vue 3 + TypeScript + ESLint + Prettier
## クイックスタート
※パッケージ管理に`pnpm`を使用します。なければ[こちら](https://pnpm.io/ja/installation)からインストールしてください。
```
pnpm i
pnpm run dev
```

## VSCode設定
- エディタにはVSCodeを使用します。
- 以下の拡張機能のインストールが必要です。
  - Volar: Vueのコーディングに必須
  - ESLint: JS, TS用のlinter
  - Prettier: コードフォーマッタ

## crxjsバグ対応
- ビルドができないバグがある
  - https://github.com/crxjs/chrome-extension-tools/issues/836
- `node_modules/@crxjs/dist/index.mjs`の101行目を以下のように修正する
  ```js
  const asset = bundle[key] || bundle[`.vite/${key};`];
  ```
</details>
