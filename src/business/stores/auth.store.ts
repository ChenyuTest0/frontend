import { acceptHMRUpdate, defineStore } from 'pinia';
import { container } from 'tsyringe';
import { AuthRepository } from '../repositories/auth.repository';
// HACK:時限的に情報をLocalStorageに保存する処理
// import { PiniaHelperUtil } from '@/shared/utils/pinia-helper.util';
import { NotificationCenterUtil } from '@shared/utils/notification-center.util';

export interface AuthInfo {
  mailAddress: string | undefined;
  token: string | undefined;
  displayName: string | undefined;
}

// HACK:時限的に情報をLocalStorageに保存する処理
// const authStoreUtil = new PiniaHelperUtil();

export const useAuthStore = defineStore({
  // アプリ全体でUniqueになるIDを定義する
  // 基本的に `{domain}.{service}`
  id: 'business.auth',

  // 内部的に保持する情報を定義し、初期化する
  state: (): AuthInfo => ({
    mailAddress: undefined,
    token: undefined,
    displayName: undefined
  }),
  // Storageへのセッション格納処理
  persist: {
    // Session Storageに同期する
    storage: sessionStorage

    // HACK: 30秒だけLocalStorageに保存する, beforeRestoreでこのStoreをHelperに保存する
    // storage: authStoreUtil.limitedLocalStorage(30),
    // beforeRestore: (context: PiniaPluginContext) => {
    //   authStoreUtil.setLimitedTargetStore(context.store);
    // }
  },

  // 画面から参照される情報を定義する
  getters: {
    getToken: state => {
      return state.token;
    },
    getDisplayName: state => {
      return state.displayName;
    },
    isLogin: state => {
      return state.token !== undefined;
    }
  },

  // 画面から実行される処理を記述する
  actions: {
    /**
     * ログアウトの実施
     *
     * @return {*}  {Promise<void>}
     */
    async logout(): Promise<void> {
      NotificationCenterUtil.emit('Logout');
      this.$reset();
    },
    /**
     * ログインの実施
     *
     * @param {string} mailAddress 対象のメールアドレス
     * @param {string} password 対象のパスワード
     * @return {*}  {Promise<void>}
     */
    async login(mailAddress: string, password: string): Promise<void> {
      if (this.isLogin) return;

      const authRepository = container.resolve(AuthRepository);
      const response = await authRepository.login(mailAddress, password);
      this.mailAddress = mailAddress;
      this.token = response.data.token;
      this.displayName = response.data.displayName;
    }
  }
});

// HMRされたときにStoreの状態を維持する
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
