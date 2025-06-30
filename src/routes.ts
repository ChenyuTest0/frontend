// HACK: GTMにURLを送る場合はコメントアウト解除
// import { container } from 'tsyringe';
import { App } from 'vue';
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized
} from 'vue-router';
import Login from './business/pages/login/login.vue'; // 静的ロードしておく資源。
import { businessRoutes, businessSharedRouterGuard } from './business/routes';
// HACK: GTMにURLを送る場合はコメントアウト解除
// import {
//   GoogleTagManagerUtil,
//   InjectableKey
// } from './core/utils/google-tag-manager.util';
import NotFound from '@shared/pages/not-found.vue';
import { $t } from '@shared/utils/i18n.util';

// HACK: GTMにURLを送る場合はコメントアウト解除
// container.register(InjectableKey, { useValue: 'GTM_ID' });
// const gtmUtil = container.resolve(GoogleTagManagerUtil);

// LazyLoadする資源はimport文を呼び出す関数を渡す
// EX) const Dashboard = () => import('./business/pages/dashboard/dashboard.vue');

// ルーティング設定
/** @type {import('vue-router').RouterOptions['routes']} */
const routes: import('vue-router').RouterOptions['routes'] = [
  { path: '/', component: Login, meta: { title: $t('LoginPage.Title') } },
  { path: '/:path(.*)', component: NotFound }
];

// Routeを結合
const appRoutes = routes.concat(businessRoutes);

// VueRouterへ登録する
export const registVueRouter = (app: App<Element>): void => {
  const defaultTitle = 'Mobile CoE Vue.js Assetize';
  const router = createRouter({
    history: createWebHistory(),
    routes: appRoutes
  });
  // 共通的なGuardを設定する
  router.afterEach((to: RouteLocationNormalized) => {
    document.title = (to.meta?.title as string) || defaultTitle;
    // HACK: GTMにURLを送る場合はコメントアウト解除
    // gtmUtil.pushTag({ url: to.fullPath });
  });
  router.beforeEach(businessSharedRouterGuard);
  app.use(router);
};
