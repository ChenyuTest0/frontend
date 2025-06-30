import { RouteLocationNormalized } from 'vue-router';

import { useAuthStore } from './stores/auth.store';
import { AUTH_TAB, SIDE_MENU, useMenuTabStore } from './stores/menu-tab.store';
import { ModalUtil } from '@/shared/utils/modal.util';
import { $t } from '@shared/utils/i18n.util';

export enum MENU_PATH {
  AUTH = '/dashboard/authentication',
  DATABASE = '/dashboard/database',
  STORAGE = '/dashboard/storage',
  HOSTING = '/dashboard/hosting',
  FUNCTIONS = '/dashboard/functions'
}

export enum MENU_ROUTE_NAME {
  AUTH = 'dashboard-auth',
  DATABASE = 'dashboard-database',
  STORAGE = 'dashboard-storage',
  HOSTING = 'dashboard-hosting',
  FUNCTIONS = 'dashboard-function'
}

export enum AUTH_TAB_PATH {
  USERS = '/user',
  SIGN_IN_METHOD = '/sign-in-method',
  TEMPLATES = '/template',
  USAGE = '/usage'
}

export enum AUTH_TAB_ROUTE_NAME {
  USERS = 'auth-user',
  SIGN_IN_METHOD = 'auth-method',
  TEMPLATES = 'auth-template',
  USAGE = 'auth-usage'
}

// LazyLoadする資源
// LazyLoadする場合はimport分でcomponentを呼び出す
const Dashboard = () => import('@/business/pages/dashboard/dashboard.vue');
const Authentication = () =>
  import('@/business/pages/dashboard/authentication/authentication.vue');
const UserList = () =>
  import(
    '@/business/pages/dashboard/authentication/user/user-list/user-list.vue'
  );
const Database = () =>
  import('@/business/pages/dashboard/database/database.vue');
const Method = () =>
  import(
    '@/business/pages/dashboard/authentication/sign-in-method/sign-in-method.vue'
  );

const setAuthTab = (tabNumber: AUTH_TAB) => {
  return () => {
    useMenuTabStore().setTab(tabNumber);
  };
};
const setMenuAndTitle = (menuNumber: SIDE_MENU, title: string) => {
  return () => {
    useMenuTabStore().setMenu(menuNumber);
    useMenuTabStore().setPageTitle(title);
  };
};

// ルーティング設定
/** @type {import('vue-router').RouterOptions['routes']} */
export const businessRoutes: import('vue-router').RouterOptions['routes'] = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { title: $t('DashboardPage.Title') },
    beforeEnter: to => {
      return to.fullPath === '/dashboard' || to.fullPath === '/dashboard/'
        ? MENU_PATH.AUTH + AUTH_TAB_PATH.USERS
        : true;
    },
    children: [
      {
        path: 'authentication',
        name: MENU_ROUTE_NAME.AUTH,
        component: Authentication,
        beforeEnter: to => {
          useMenuTabStore().setMenu(SIDE_MENU.AUTHENTICATION);
          useMenuTabStore().setPageTitle($t('DashboardPage.SideMenu.Menu1'));
          return to.fullPath === MENU_PATH.AUTH ||
            to.fullPath === MENU_PATH.AUTH + '/'
            ? MENU_PATH.AUTH + AUTH_TAB_PATH.USERS
            : true;
        },
        children: [
          {
            path: 'user',
            name: AUTH_TAB_ROUTE_NAME.USERS,
            component: UserList,
            beforeEnter: setAuthTab(AUTH_TAB.USERS)
          },
          {
            path: 'method',
            name: AUTH_TAB_ROUTE_NAME.SIGN_IN_METHOD,
            component: Method,
            props: true,
            beforeEnter: setAuthTab(AUTH_TAB.SIGN_IN_METHOD)
          },
          {
            path: 'template',
            name: AUTH_TAB_ROUTE_NAME.TEMPLATES,
            component: Method,
            props: true,
            beforeEnter: setAuthTab(AUTH_TAB.TEMPLATES)
          },
          {
            path: 'usage',
            name: AUTH_TAB_ROUTE_NAME.USAGE,
            component: Method,
            props: true,
            beforeEnter: setAuthTab(AUTH_TAB.USAGE)
          }
        ]
      },
      {
        path: 'database',
        name: MENU_ROUTE_NAME.DATABASE,
        component: Database,
        props: true,
        beforeEnter: setMenuAndTitle(
          SIDE_MENU.DATABASE,
          $t('DashboardPage.SideMenu.Menu2')
        )
      },
      {
        path: 'storage',
        name: MENU_ROUTE_NAME.STORAGE,
        component: Database,
        props: true,
        beforeEnter: setMenuAndTitle(
          SIDE_MENU.STORAGE,
          $t('DashboardPage.SideMenu.Menu3')
        )
      },
      {
        path: 'hosting',
        name: MENU_ROUTE_NAME.HOSTING,
        component: Database,
        props: true,
        beforeEnter: setMenuAndTitle(
          SIDE_MENU.HOSTING,
          $t('DashboardPage.SideMenu.Menu4')
        )
      },
      {
        path: 'functions',
        name: MENU_ROUTE_NAME.FUNCTIONS,
        component: Database,
        props: true,
        beforeEnter: setMenuAndTitle(
          SIDE_MENU.FUNCTIONS,
          $t('DashboardPage.SideMenu.Menu5')
        )
      }
    ]
  }
];

// Router Guard
export const businessSharedRouterGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => {
  // ログイン画面からダッシュボードへの遷移を感知した場合、ブラウザバックを抑制する
  if (from.fullPath === '/' && to.fullPath.includes('/dashboard/')) {
    // ブラウザバック抑制
    history.pushState(null, '', document.URL);
  }

  // 画面遷移される前に、全てのモーダルを閉じる
  ModalUtil.closeAll();
  const auth = useAuthStore();
  if (to.fullPath === '/') {
    return auth.isLogin ? MENU_PATH.AUTH + AUTH_TAB_PATH.USERS : true;
  }
  return auth.isLogin ? true : '/';
};
