<a name="1.8.2"></a>

# 1.8.2

## Fix

- Github CopilotのMCP設定を明確的に無効化

<a name="1.8.1"></a>

# 1.8.1

## Feature

- GitHub Copilot Agent用のプロンプトにコミットメッセージの生成プロンプトを追加

## Changes

- TailwindCSSを4.1.7にアップデート
  - 合わせて参照パッケージのアップデート

## Fix

- 細かいプロンプトの修正

<a name="1.8.0"></a>

# 1.8.0

## Feature

- GitHub Copilot Agentに対するサポートを追加
  - コード生成プロンプトを追加
  - コードレビュー用プロンプトを追加
  - テスト生成用プロンプトを追加

## Changes

- Reactivity Transform(Vue Macros)を無効化
  - Vue Macrosがプラグイン依存でビルド時にエラーが発生するため、利用自体を中止。

## Fix

- CodeLabelUtil.getLabelElementがProdビルドで正常に動作していない問題を修正
- Stylelintのルール見直し。既に不要なプラグインモジュールを削除。

<a name="1.7.3"></a>

# 1.7.3

## Fix

- huskyのpre-commit処理をhusky10ベースに修正
- UTが落ちていた事を修正
  - focus-trap のモック化により「tabbable node が必要」エラーを回避
- Lintエラーを修正
  - 型推論の無限ループを防ぐために i18n.global.te の型を明示

<a name="1.7.2"></a>

# 1.7.2

## Changes

- axiosを1.8.3にアップデート。**[脆弱性](https://nvd.nist.gov/vuln/detail/CVE-2025-27152)の対応。**
- vue-i18nを11.1.2にアップデート。**[脆弱性](https://nvd.nist.gov/vuln/detail/CVE-2025-27597)の対応。**
- viteを6系にアップデート。
- vitestを3系にアップデート。

## Feature

- APIリクエスト時に通信エラー(NetworkError)が発生した場合、指定回数リトライできるように `useApiHandler` に引数を追加。
  - 引数を省略した場合のデフォルトではリトライしない。

<a name="1.7.1"></a>

# 1.7.1

## Feature

- [budoux](https://github.com/google/budoux/tree/main/javascript/)を導入。`<budoux-ja></budoux-ja>`で囲った日本語文字列の改行を自然に表示します。又は `<budoux-ja v-text="text" />` v-text, v-htmlのバインディングにも対応しています。
- v-htmlに渡す値のXSS対策に `StringUtil.sanitizeHtml` を追加。

## Changes

- 多くのバグ修正が発生してたため、Vue.jsを3.5.13にアップデート。
- pinia-plugin-persistedstateを4.1.3にアップデート、
  - 合わせて内部利用されているcross-spawnを一律7.0.5へアップデート。 **[脆弱性](https://github.com/advisories/GHSA-3xgq-45jj-v275)対応有り。persistedstateを利用していない場合影響なし。**
- piniaを2.2.7にアップデート。

## Note

- ESlint9, Stylelint16の取り込みはサードパーティプラグインのアップデート待ち。

<a name="1.7.0"></a>

# 1.7.0

## Changes

- Vue.jsを3.5.10にアップデート。
- viteを5.4.8にアップデート。
- vitestを2.1.1にアップデート。
- Typescriptを5.6.2にアップデート。
- Axiosを1.7.7にアップデート。 **[脆弱性](https://security.snyk.io/package/npm/axios/1.6.7)対応有り。クライアントサイドの脆弱性ではないので影響なし。**
- 他細かいパッケージをアップデート。
- 特筆すべき破壊的変更はありません。

## Fix

- i18n.util.tsが画面初期起動後にロケール変更が正常に多言語表示してない問題を修正。
- UTコードにLinterが上手く動作していなかったので修正。
- `stylelint-config-recommended-vue`の参照パッケージ`stylelint-config-recommended`が古く、上手く動作していなかった問題を修正。

## Feature

- Axiosの通信処理を[Fetch Adapter](https://www.npmjs.com/package/axios#-fetch-adapter)に変更。
- README.mdのfnmについての記述を更新。
- `@vueuse/integrations` によるFocusTrapの仕組みを追加。詳細は開発ドキュメントを参照。

## Note

- AxiosがFetchに対応したので、Fetch移行計画は停止。
- ESlint9, Stylelint16の取り込みはサードパーティプラグインのアップデート待ち。

<a name="1.6.4"></a>

# 1.6.4

## Fix

- UTの拡充。
- CodeLabelUtilが正常に動作してない問題を修正。

<a name="1.6.3"></a>

# 1.6.3

## Changes

- Vue.jsを3.4.27にアップデート。
- viteを5.2.13にアップデート。
- vitestを1.6.0にアップデート。

## Feature

- GlobalFilterにvalidationMessageを追加。

## Fix

- UTの拡充。

<a name="1.6.2"></a>

# 1.6.2

## Fix

- pnpmのアップデートにより各種コマンドに `--` が不要になっていたことの修正

<a name="1.6.1"></a>

# 1.6.1

## Fix

- `tsconfig.json` の `compilerOptions.types` から `@intlify/unplugin-vue-i18n/messages` を削除

<a name="1.6.0"></a>

# 1.6.0

## Changes

- Vue.jsを3.4.20にアップデート。
  - [Changelog](https://github.com/vuejs/core/blob/main/CHANGELOG.md#breaking-changes)
  - 破壊的変更は影響はグローバルJSXの削除（TSXファイル利用時のみ影響有り。tsconfig.jsonの修正を取り込むこと。）
  - `@vnodeXXX` イベントリスナの削除（@vue:XXXが代替）、`v-is`の削除は利用してるアプリには影響有り。
  - `Reactivity Transform` の件はVue Macrosを導入済みであるため影響無し。
- Node.jsを20.11.1へアップデート。
  - [セキュリティリリース](https://nodejs.org/en/blog/vulnerability/february-2024-security-releases)があるためアップデートを行うこと。
- Typescriptを5.3.3へアップデート。
- Viteを5.1.4へアップデート。
- その他細かいpackageをアップデート。
- [VueUse](https://vueuse.org/) をpackageに追加。

## VSCode

- `GitLens` 有料化につき非推奨プラグインに設定。代わりに `git-file-history` を推奨化。
- `vitest-explorer` 更新終了につき `Vitest`プラグインへ移行

<a name="1.5.0"></a>

# 1.5.0

## Feature

- スケルトンのStoreのgetterの記述方法をpiniaの推奨方法に修正。
- 失敗事例をベースに開発ガイド、MRチェックリストに注意すべき事項を追記。
- `Bracket Lens`, `Figma for VS Code`を推奨プラグインに設定。

## Changes

- Vue.jsを3.3.12にアップデート。
- Node.jsを20.10.0へアップデート。
- Typescriptを5.2.2へアップデート。
- Viteを5.0.10へアップデート。
  - ほぼ影響は無いが、[破壊的な変更](https://vitejs.dev/guide/migration.html) が存在するためよく確認すること。
  - 特に `import.meta.env` と [予約された環境変数](https://vitejs.dev/config/shared-options.html#define) の自動置き換えが影響が大きい。
  - CommonJSが非推奨となったため、 `vite.config.ts` , `vitest.config.ts` の拡張子を `mts` に。
    - CommonJSのサポートはVite6で完全に削除されるため、CommonJSのimportを行っているプロジェクトは将来的に正常にビルドできなくなる。[移行ガイド](https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated)を確認しておくこと。
- Vitestを1.0.4へアップデート。
  - ほぼ影響は無いが、[破壊的な変更](https://github.com/vitest-dev/vitest/releases/tag/v1.0.0)が存在するためよく確認すること。

## Note

- 次期バージョンでReact.jsのアーキに合わせていくつかのコンポーネントを組み換え予定。これにより破壊的変更が発生する見込み。
  - Axiosの廃止。fetchに移行。
  - yupをzodに置き換え。
  - expressのモックサーバーをMock Service Workerに移行。

<a name="1.4.2"></a>

# 1.4.2

## Changes

- Vue.jsを3.3.7にアップデート。
  - 破壊的変更は無いが、WeakMap/WeakSet採用による大幅なパフォーマンスアップが見られる。
- Node.jsを20.9.0へアップデート。

<a name="1.4.1"></a>

# 1.4.1

## Feature

- Component 単位でローディング表示を行えるようにする `v-loading` Directive を追加。
- ビルド時に `reports/rollup-visualizer.html` にBundleFileのレポートを出力するように。

## Changes

- Node.jsを20.8.1へアップデート。
- Viteを4.5.0へアップデート。
- その他併せて細かいパッケージを最新化。
- [Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html) のimport宣言がglobalsで実施されるようになった為不要に。

**Before**

```typescript
import { $ref, $computed } from 'unplugin-vue-macros/macros';
let dropdownOpen = $ref(false);
```

**After**

```typescript
let dropdownOpen = $ref(false);
```

## Note

- 次期バージョンでReact.jsのアーキに合わせていくつかのコンポーネントを組み換え予定。これにより破壊的変更が発生する見込み。
  - Axiosの廃止。fetchに移行。
  - yupをzodに置き換え。

<a name="1.4.0"></a>

# 1.4.0

## Changes

- Vue.js を 3.3.4 へアップデート。
- Typescript を 5.0.4 へアップデート。細かい型のチェック、及び Decorator の型チェック仕様が[破壊的変更](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#lib-d-ts-changes)となっているため、Enum やカスタムした Decorator を使っているプロジェクトはよく確認すること。
  - DI 用パッケージである tsyringe を Typescript5 系に対応するため、declare 宣言を`tsyringe.d.ts`に追加。これは一時的な対応であり、正式な修正版が提供された際に削除される見込み。
  - 多言語対応パッケージである vue-i18n を Typescript5 系に対応するため、`tsconfig.json`の types に `@intlify/unplugin-vue-i18n/messages` を追加。
- yup を 1.2.0 へアップデート。[破壊的変更](https://github.com/jquense/yup/blob/master/CHANGELOG.md#breaking-changes-3)があるため、Validator をカスタムしている場合は気をつけること。若干の記述変更となる。
- TailwindCSS を 3.3.2 へアップデート。`@tailwindcss/line-clamp`が本体に内包された為、`tailwind.config.js`から削除し、パッケージの参照も廃止。
- VSCode の推奨プラグインに[Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)と、[Vitest Snippets](https://marketplace.visualstudio.com/items?itemName=deinsoftware.vitest-snippets)を追加。

- その他併せて細かいパッケージを最新化。

## Breaking Changes

- [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html)が非推奨となった為、機能を代替する[Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html)を導入。

**Before**

```typescript
import { $ref, $computed } from 'vue/macros';
```

**After**

```typescript
import { $ref, $computed } from 'unplugin-vue-macros/macros';
```

また、この導入に際して、`App.vue`, `env.d.ts`, `tsconfig.json`, `vite.config.ts` に手を加えている為、それらの変更差分も確認すること。

## Skeleton

- `source.unsplash.com`の代わりに`picsum.photos/800`を見るように

## Note

- 現状使っている Validator である[yup](https://github.com/jquense/yup)は、よりモダンな[zod](https://zod.dev/)へ置き換える見込み。

<a name="1.3.6"></a>

# 1.3.6

## Changes

- 開発ガイドに「環境設定ファイルの外出しブランチ」、「大量の一覧を作る場合の Component 選定」、「それ以外のパフォーマンスチューニング」を記載。
- 開発ガイドのアニメーション処理について細かく記載。
- Stylelint を 15 系へアップデート。Stylelint と Prettier が競合しなくなったため、 `stylelint-config-prettier` を削除。`indentation` `string-quotes` のルールを削除。
- Vite を[4.2 系](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#420-2023-03-16)にアップデート。 `import.meta.env` の値を直接 HTML テンプレートから読めるように。Typescript5 へのアップデートは Vue.js 本体が対応していないのでまだ。
- tsconfig の `strictNullChecks` を true に。
- その他細かいパッケージのアップデート。

## Breaking Changes

- `@maybecode/vue-next-animejs` を廃止。 `animejs` を直接呼び出すように。影響は軽微。 `v-anime` Directive はそのまま利用可能。

**Before**

```typescript
// main.ts
import { vueNextAnimejs } from '@maybecode/vue-next-animejs';
app.use(vueNextAnimejs);

// login.vue
import { anime } from '@maybecode/vue-next-animejs';
onMounted(() => {
  anime({
    targets: '.fade-animation',
    opacity: [0, 1],
    easing: 'easeInOutQuad'
  });
});
```

**After**

```typescript
// setup-application.ts
import { animeDirective } from './directives/anime.directive';
export const registDirective = (app: App<Element>): void => {
  app.directive('multiple-click-prevention', multipleClickPreventionDirective);
  app.directive('ripple', rippleEffectDirective);
  app.directive('tap-event', tapEventDirective);
  app.directive('anime', animeDirective);
};

// login.vue
import anime from 'animejs';
onMounted(() => {
  anime({
    targets: '.fade-animation',
    opacity: [0, 1],
    easing: 'easeInOutQuad'
  });
});
```

## Skeleton

- `Chart.js`を 4 系に。それに合わせて`vue-chart-3`を廃止。`vue-chartjs`に。

<a name="1.3.5"></a>

# 1.3.5

## Changes

- Typescript を 4.8.4 へアップデート。
- package.json に `lint:type-check` コマンドを追加。`vue-tsc`を用いた細かい Type Check が実行されるように。

## Fix

- `vue-tsc` コマンドで発生する Type エラーを修正。
- Stylelint のアップデートで追加された `import-notation` が SCSS と相性が悪い為無効化。

<a name="1.3.4"></a>

# 1.3.4

## Changes

- Vite を 4.0.1 へアップデート。基本的に既存資産に影響は無いが、Rollup のビルドオプションをカスタムしている場合は[Migration Guide](https://vitejs.dev/guide/migration.html)を確認すること。
- _併せて Safari14 のサポートを終了。_ サポートを復活させたい場合は開発ガイドを参照。
- `useShowDialogApiHandler`（標準で isShowDialog=true となる useApiHandler）を追加。
- 開発ガイドに `useApiHandler` の使い方について追記。
- 開発ガイドに `開発 Tips` の項目を追加。
- その他細かいライブラリのアップデート。

## Fix

- サンプルの Visual Regression Test のテストケースが通らない問題を修正。
- Readme の Vue.js DevTools のリンクを修正。

<a name="1.3.3"></a>

# 1.3.3

## Changes

- Node.js のバージョンを 18.12.0 へアップデート。
- pnpm のバージョンを 7.14.1 へアップデート。
- vue-tsc のバージョンを 1.0.9 へアップデート。それに伴い、eslint のルール(`.eslintrc.js`)を最適な形に修正。
- その他細かいモジュールのバージョンをアップデート。これらによる破壊的変更は無い。

## Fix

- stylelint から指定されている `stylelint-config-recommended-vue` が package.json に入っていなかったので追加。

<a name="1.3.2"></a>

# 1.3.2

## Fix

- ローカル実行時の環境切り替え（pnpm start mode {環境}） が動作しない問題を解決
- stylelint の設定変更。scss ファイルは postcss-scss で確認するように CustomSyntax を設定。
- lint-staged 上の stylelint コマンドの syntax オプションを削除。

<a name="1.3.1"></a>

# 1.3.1

## Fix

- useApiHandler にて 400 エラーが発生した場合、error の State にエラーオブジェクトが保持されない問題の修正。
- Reactivity Transform の有効化に伴い発生していた Javascript エラーの修正。
- ESLint のルールから Cypress 関連のルールを削除。

<a name="1.3.0"></a>

# 1.3.0

## Breaking Changes

- E2ETest のソリューションを Cypress から Playwright に移行。

## New Features

- Playwright を用いた Visual Regression Test を実装。

## Changes

- [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html)を有効化。`.value`を使わずともリアクティブな値へアクセス可能へ。
- vue-code-check-frontend-list に Store の使い方について追記。
- Ant Design Vue の導入方法について開発ガイドに記載。

<a name="1.2.0"></a>

# 1.2.0

## Breaking Changes

- UT のソリューションを Jest から Vitest に移行。テストケースは Jest 互換であるため、公式の[マイグレーションガイド](https://vitest.dev/guide/migration.html#migrating-from-jest)を参考にしつつ移行を行うこと。

## Changes

- 細かいモジュールのバージョンアップ。ビジネスロジック側に要求する破壊的変更は無い。
- npm ci に相当する pnpm run ci コマンドを追加。

## Fix

- SessionStorageUtil, LocalStorageUtil の getItems,removeItems が複数のアイテムをターゲットにしない問題を修正。

<a name="1.1.3"></a>

# 1.1.3

## Changes

- 多重 Submit 制御について、更に開発ガイドラインに追記。
- 絵文字禁止、絵文字を含む最大/最小文字数のバリデーション処理を追加。
- husky を有効化。git の pre commit 時に、Stage されたソースコードの lint が実行されるように。
- Gitlab 向けにマージリクエストチェックリストを追加。

<a name="1.1.2"></a>

# 1.1.2

## Changes

- [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)を正式採用。スケルトンの AuthStore の SessionStorage 実装をこちらへ置き換え。
- `pinia-plugin-persistedstate` を利用した時限的なフロントエンドキャッシュ保持機構を `PiniaHelperUtil` に追加。
- ブラウザバックの抑制処理を追加。
- ブラウザリフレッシュ時の State の永続（F5 押下時の State の Restore）について開発ガイドラインに明記。
- 多重 Submit 制御について開発ガイドラインに明記。
- 認証必要な URL に対する直リンクの制御について開発ガイドラインに明記。
- 細かいモジュールのバージョンアップ。ビジネスロジック側に要求する破壊的変更は無い。
  - `@vue/test-utils`, `vue-i18n` は beta 版から正式版に。
  - `@types/tailwindcss` は TailwindCSS が直接 d.ts を提供するようになったため削除。
  - `pinia-plugin-persistedstate` を新規追加。

<a name="1.1.1"></a>

# 1.1.1

## Changes

- Vite のバージョンを 3.0 へアップデート。
  - これによりビルド成果物が更にサイズが縮小され、初期ビルド速度も向上される。
  - 3.0 の標準設定で `vendor.js` の出力を行わないように。復活の手順を開発ガイドに記載。
  - 差分は `vite.config.ts`、及び周辺のライブラリのみ。
- Node.js の[セキュリティリリース](https://nodejs.org/ja/blog/vulnerability/july-2022-security-releases/)に対応し、推奨バージョンを 16.16.0 へアップデート。
- package.json より`audit.js`を削除。 `pnpm run audit` の実行時、常に最新の`audit.js`をダウンロードし、実行するように。
  - 加えて脆弱性診断の Whitelist を `auditjs.json`として追加。
- README.md に`corepack`についての注記を追加。

<a name="1.1.0"></a>

# 1.1.0

## Breaking Changes

- [Script Setup](https://v3.ja.vuejs.org/api/sfc-script-setup.html)構文を標準に
- Script Setup 構文の対応に合わせ ESlint のルールを更新

## Changes

- ESlint ルールの最適化による Lint 実行の高速化
- SCSS を.vue ファイルから読み込む場合、scoped を行う事を推奨に
- Jest を 28 系へアップデート
- Prettier を 2.7 系へアップデート
- その他細かいコンポーネントをバージョンアップ

<a name="1.0.1"></a>

# 1.0.1

## Changes

- .html、.vue に対する class 名の自動ソートに対応
- フルスクリーンモーダルの実装（開発ガイド、ModalUtil クラスの基本的な使い方を参照）
- 開発ガイド、CSS フレームワークの項目に最新動向を記載

<a name="1.0.0"></a>

# 1.0.0

初回リリース。
