# Mobile CoE Vue.js Skeleton

## 環境構築

### 1. 開発ツール

[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code/) をインストールする。

_構文チェックやコードフォーマッタなど。VS Code でこのプロジェクトを開いた際に推奨プラグインとして表示されるので、それを全てインストールする。_

### 2. Git Clone

- ソースコード一式をローカルに Clone する。

```bash
git clone https://innersource.accenture.com/scm/jrd/mcoe-vuejs-assetize.git
```

### 3. nodenv,volta

- 他のプロジェクトの開発や、今後の npm の複数バージョン管理も考慮して、nodenv,volta をインストールする。
- ［Windows］[volta](https://volta.sh/)から volta をインストールする。
- ［Mac］[anyenv](https://github.com/anyenv/anyenv) から nodenv をインストールする。
- Windows 向けにこれまで推奨とされていた `nodist` は既に更新が終了されているため非推奨となる。

#### volta のインストール (wingetはWindows標準のパッケージマネージャ)

Windows PowerShellで実施する。

```bash
winget install Volta.Volta
```

#### volta でのインストール

```bash
volta install node
```

#### nodenv でのインストール

```bash
nodenv install
```

### 4. pnpm の導入

- このアーキでは、Node.js のパッケージマネージャは、`npm` の代わりに[pnpm](https://pnpm.io/)を採用する。
  以下のコマンドでインストールする。

#### volta でのインストール

```bash
volta install corepack
corepack enable
corepack enable pnpm
```

#### nodenv でのインストール

```bash
corepack enable
corepack enable pnpm
```

> ※[corepack](https://nodejs.org/api/corepack.html)は node.js 公式の、パッケージマネージャを管理するパッケージマネージャである。

### 5. npm パッケージをインストール

- 下記コマンドで、実行に必要なパッケージのインストールをする。

```bash
pnpm run ci
```

### 6. デバック実行

- 下記コマンドで、vite と mock_server のデバックサーバが起動する。

```bash
pnpm start
```

- 環境ごとのデバッグサーバを立ち上げたい場合は以下のコマンドを実行する。

```bash
pnpm start mode {環境}
```

- 推奨の VitePlugin を導入している場合は、VSCode を立ち上げた時点でデバッグサーバが起動する。

### 7. VSCode からのステップ実行

- Run & Debug より、`Debug from VSCode`を選択することで、デバッグサーバのプロセスにアタッチし、ステップ実行が VSCode から可能となる。

### 8. Vue.js DevTools

Chrome 拡張として Vue.js のデバッグツールが提供されている。これは Pinia の Store の中身を確認したり、UI の重なりを確認することができる。
Vue.js3 が最新版になった事により、β 版 Chrome 拡張は非推奨となった。[正式版](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)をインストールする。

利用方法は[公式サイト](https://devtools.vuejs.org/)を確認する。

## 開発

### 1. Code Formatter

基本的にファイルをセーブする際に自動的に format してくれるが、手動で動かしたい場合は以下のコマンドを利用する。

```text
On Windows Shift + Alt + F
On Mac     Shift + Option + F
```

### 2. Testing

#### 2.1 Unit Tests

- `pnpm test`で Vitest による UT が実行される。
- CI 環境で実行するには、`pnpm test:ci`を実行する。結果が `reports/ut-results.xml`に JUnit 形式で出力される。
- CI モードのみ`coverage/`に istanbul(lcov) 形式でカバレッジレポートが出力される。

#### 2.2 End-To-End Tests

- `pnpm playwright install` で初期化して利用する。
- 予め`pnpm start`でデバッグサーバーを立ち上げた状況で、`pnpm run test:e2e`を実行することで Playwright による E2E が実行される。
- CI 環境で実行するには、`pnpm test:e2e:ci`を実行する。結果が `reports/e2e-results.xml`に JUnit 形式で出力される。
- `pnpm playwright codegen` で Playwright の[コードジェネレータ](https://playwright.dev/docs/codegen-intro#running-codegen)が起動する。これはブラウザの操作を記録し、テストコードに落とし込む。

### 3. CI/CD

#### 3.1 Linter の実行

- `pnpm run lint`で ESLint, StyleLint による Linter が実行される。

#### 3.2 脆弱性確認

- `pnpm run audit`で現在使われているパッケージに対する OWASP 基準での脆弱性チェックが実行される。
- Junit 基準でのフォーマットのレポートが`reports/scan_node_modules.xml`に出力される。

#### 3.3 静的ビルド

- `pnpm run build:prod`で現在の資源をビルドする。
- `pnpm run build:prod --mode={環境}`で特定の環境に向けた資源をビルドする。
- SourceMap を有効にしたまま静的資源をビルドしたい場合は、`pnpm run build`コマンドを実行する。

##### 3.3.1 旧ブラウザへの対応

このアーキがが標準でサポートしているブラウザは[ESM に対応したブラウザ](https://caniuse.com/es6-module)のみである（IE は非対応）。
更に古いバージョンのブラウザサポートが必要である場合、[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)を導入すること。

### 4. dts-gen

Vue.js は、周辺ライブラリが Typescript の対応を実施していない場合が多い。
その場合は `dts-gen` コマンドを利用し、`d.ts` ファイルを作成する。

作られたファイルは、 `src/shared/@types/` ディレクトリに配置する。
なお、VSCode は再起動しないと正しく `d.ts` を読み込まない事に注意。

```bash
pnpm run dts-gen -m {d.tsを作りたいnpm名}
```

### 5. openapi-typescript-codegen

OpenAPI 定義から API の型情報を自動生成する。
生成された情報は恐らく `type-dist/services/` に丸められることになるが、Typescript の型情報を毎回作らずに済む。

```bash
pnpm run openapi-gen --input {OpenAPIの定義が置いてあるパス}/base.yaml --output ./type-dist --client axios
```

### 6. 利用ライブラリの一覧とライセンス情報出力

以下のコマンドで`licenses.csv`が出力される。

```bash
pnpm run license-checker
```
