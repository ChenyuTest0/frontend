import { acceptHMRUpdate, defineStore } from 'pinia';

export enum SIDE_MENU {
  AUTHENTICATION = 1,
  DATABASE = 2,
  STORAGE = 3,
  HOSTING = 4,
  FUNCTIONS = 5
}

export enum AUTH_TAB {
  USERS = 1,
  SIGN_IN_METHOD = 2,
  TEMPLATES = 3,
  USAGE = 4
}

export interface TabInfo {
  currentMenu: number;
  currentTab: number;
  currentPageTitle: string;
}

export const useMenuTabStore = defineStore({
  // アプリ全体でUniqueになるIDを定義する
  // 基本的に `{domain}.{service}`
  id: 'business.menu-tab',

  // 内部的に保持する情報を定義し、初期化する
  state: (): TabInfo => ({
    currentMenu: SIDE_MENU.AUTHENTICATION,
    currentTab: AUTH_TAB.USERS,
    currentPageTitle: ''
  }),

  // 画面から参照される情報を定義する
  // getters: {
  // },

  // 画面から実行される処理を記述する
  actions: {
    setMenu(menu: number) {
      this.currentMenu = menu;
    },
    setTab(tab: number) {
      this.currentTab = tab;
    },
    setPageTitle(title: string) {
      this.currentPageTitle = title;
    }
  }
});

// HMRされたときにStoreの状態を維持する
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenuTabStore, import.meta.hot));
}
