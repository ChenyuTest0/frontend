<template>
  <div class="flex w-full bg-purple-900 text-white">
    <div class="ml-2 flex h-12 overflow-hidden">
      <button
        class="mx-3 border-white hover:border-b-2"
        :class="{ 'border-b-2': tab.currentTab === 1 }"
        @click="onClickTab(1)"
      >
        <span>{{ $t('DashboardPage.AuthenticationPage.tab1') }}</span>
      </button>

      <button
        class="mx-3 border-white hover:border-b-2"
        :class="{ 'border-b-2': tab.currentTab === 2 }"
        @click="onClickTab(2)"
      >
        <span>{{ $t('DashboardPage.AuthenticationPage.tab2') }}</span>
      </button>

      <button
        class="mx-3 border-white hover:border-b-2"
        :class="{ 'border-b-2': tab.currentTab === 3 }"
        @click="onClickTab(3)"
      >
        <span>{{ $t('DashboardPage.AuthenticationPage.tab3') }}</span>
      </button>

      <button
        class="mx-3 border-white hover:border-b-2"
        :class="{ 'border-b-2': tab.currentTab === 4 }"
        @click="onClickTab(4)"
      >
        <span>{{ $t('DashboardPage.AuthenticationPage.tab4') }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  AUTH_TAB_PATH,
  AUTH_TAB_ROUTE_NAME,
  MENU_PATH
} from '@/business/routes';
import { AUTH_TAB, useMenuTabStore } from '@/business/stores/menu-tab.store';
import { $t } from '@shared/utils/i18n.util';

const tab = useMenuTabStore();
const router = useRouter();

const onClickTab = (tabNumber: number) => {
  tab.setTab(tabNumber);
  switch (tabNumber) {
    case AUTH_TAB.USERS:
      router.push(MENU_PATH.AUTH + AUTH_TAB_PATH.USERS);
      break;
    case AUTH_TAB.SIGN_IN_METHOD:
      router.push({
        name: AUTH_TAB_ROUTE_NAME.SIGN_IN_METHOD,
        params: { title: $t('DashboardPage.AuthenticationPage.tab2') }
      });
      break;
    case AUTH_TAB.TEMPLATES:
      router.push({
        name: AUTH_TAB_ROUTE_NAME.TEMPLATES,
        params: { title: $t('DashboardPage.AuthenticationPage.tab3') }
      });
      break;
    case AUTH_TAB.USAGE:
      router.push({
        name: AUTH_TAB_ROUTE_NAME.USAGE,
        params: { title: $t('DashboardPage.AuthenticationPage.tab4') }
      });
      break;
    default:
      router.push(MENU_PATH.AUTH + AUTH_TAB_PATH.SIGN_IN_METHOD);
      break;
  }
};
</script>
