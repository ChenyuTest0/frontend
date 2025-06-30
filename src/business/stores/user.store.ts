import { acceptHMRUpdate, defineStore } from 'pinia';
import { container } from 'tsyringe';
import { LoggerService } from '../../core/logger/logger.service';
import {
  UserRepository,
  UserDetailResponse,
  UserEditRequest
} from '../repositories/user.repository';
import { NotificationCenterUtil } from '@shared/utils/notification-center.util';

export interface UserInfo {
  list: UserDetailResponse[];
  userDetail: UserDetailResponse | undefined;
}

export const useUserStore = defineStore({
  // アプリ全体でUniqueになるIDを定義する
  // 基本的に `{domain}.{service}`
  id: 'business.user',

  // 内部的に保持する情報を定義し、初期化する
  state: (): UserInfo => ({
    list: [],
    userDetail: undefined
  }),

  // 画面から参照される情報を定義する
  getters: {
    userList: state => {
      return state.list;
    }
  },

  // 画面から実行される処理を記述する
  actions: {
    async loadUserList() {
      const userRepository = container.resolve(UserRepository);
      const response = await userRepository.getUserList();
      this.list = response.data;
    },
    async loadUserDetail(userId: number) {
      const userRepository = container.resolve(UserRepository);
      const response = await userRepository.getUser(userId);
      this.userDetail = response.data;
    },
    async editUserDetail(id: number, detail: UserEditRequest) {
      const userRepository = container.resolve(UserRepository);
      await userRepository.editUser(id, detail);
    },
    async deleteUser(id: number) {
      const userRepository = container.resolve(UserRepository);
      await userRepository.deleteUser(id);
    },
    async addUser(detail: UserEditRequest) {
      const userRepository = container.resolve(UserRepository);
      const response = await userRepository.addUser(detail);
      const logger = container.resolve(LoggerService);
      logger.log(`addUser response :: ${JSON.stringify(response)}`);
    }
  }
});

// HMRされたときにStoreの状態を維持する
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

// ログアウトされたらStoreのResetを行う
NotificationCenterUtil.on(event => {
  if (event === 'Logout') {
    useUserStore().$reset();
  }
});
