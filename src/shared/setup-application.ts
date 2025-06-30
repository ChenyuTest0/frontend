import { container } from 'jenesius-vue-modal';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { container as diContainer } from 'tsyringe';
import { App } from 'vue';
import AlertDialog from './components/alert-dialog.component.vue';
import Loading from './components/loading.component.vue';
import { Nl2br } from './components/nl2br.component';
import { animeDirective } from './directives/anime.directive';
import { loadingDirective } from './directives/loading.directive';
import { multipleClickPreventionDirective } from './directives/multiple-click-prevention.directive';
import { rippleEffectDirective } from './directives/ripple-effect.directive';
import { tapEventDirective } from './directives/tap-event.directive';
import {
  globalErrorHandler,
  initializeNativeErrorHandler
} from './error-handler/global-error-handler';
import { filters } from './global-filters';
import { changeLocale, i18n } from './utils/i18n.util';
import { ModalUtil } from './utils/modal.util';
import { UpdateDetector } from './utils/update-detector.util';
import { ConsoleLogger } from '@core/logger/console.logger';
import { LoggerService } from '@core/logger/logger.service';

// アップデート確認処理を埋め込む
UpdateDetector.checkUpdatesInCodeInterval();

// エラーハンドラの設定
export const registErrorHandler = (app: App<Element>): void => {
  app.config.errorHandler = globalErrorHandler;
  initializeNativeErrorHandler();
};

// LoggerServiceを設定する
export const initializeLoggerService = (): void => {
  const consoleConfig = {
    level: import.meta.env.VITE_CONSOLE_LOG_LEVEL
  };
  const service = diContainer.resolve(LoggerService);
  service.addLogger(new ConsoleLogger(consoleConfig));
};

// アプリ全体で共通的に使うcomponentを登録する。
// main.jsのサイズに影響するため、最低限の登録を行う
export const registGlobalComponent = (app: App<Element>): void => {
  app.component('AlertDialog', AlertDialog);
  // modalの初期設定
  ModalUtil.initialize();
  app.component('WidgetContainerModal', container);
  app.component('Nl2Br', Nl2br);
  app.component('LoadingMask', Loading);
};

// 共通的なdirectiveを設定する
export const registDirective = (app: App<Element>): void => {
  app.directive('multiple-click-prevention', multipleClickPreventionDirective);
  app.directive('ripple', rippleEffectDirective);
  app.directive('tap-event', tapEventDirective);
  app.directive('anime', animeDirective);
  app.directive('loading', loadingDirective());
};

// GlobalFilterを登録
export const registGlobalFilter = (app: App<Element>): void => {
  app.config.globalProperties.$filters = filters;
};

// 多言語化の設定
export const registI18n = (app: App<Element>): void => {
  app.use(i18n);
  changeLocale('ja');
};

// piniaの設定
export const registPinia = (app: App<Element>): void => {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
};
