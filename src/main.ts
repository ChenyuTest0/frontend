import './polyfill.ts';
import 'budoux/module/webcomponents/budoux-ja';

import { createApp } from 'vue';
import App from './App.vue';

import './assets/css/tailwind.css';
import './assets/css/global.scss';
import { registVueRouter } from './routes';

import {
  initializeLoggerService,
  registDirective,
  registErrorHandler,
  registGlobalComponent,
  registGlobalFilter,
  registI18n,
  registPinia
} from '@shared/setup-application';

const app = createApp(App);

// エラーハンドラ設定
registErrorHandler(app);
// i18n設定
registI18n(app);
// Pinia（State管理）
registPinia(app);
// Vue-Routerの登録
registVueRouter(app);
// 共通コンポーネント登録
registGlobalComponent(app);
// directiveの登録
registDirective(app);
// Loggerの登録
initializeLoggerService();
// グローバルフィルターの登録
registGlobalFilter(app);

app.mount('#app');
