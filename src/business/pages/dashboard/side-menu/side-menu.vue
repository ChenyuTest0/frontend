<template src="./side-menu.html"></template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AUTH_TAB_PATH, MENU_PATH, MENU_ROUTE_NAME } from '@/business/routes';
import { useAuthStore } from '@/business/stores/auth.store';
import { useMenuTabStore, SIDE_MENU } from '@/business/stores/menu-tab.store';
import { $t } from '@shared/utils/i18n.util';

const auth = useAuthStore();
const menu = useMenuTabStore();
const router = useRouter();

const onClickMenu = (menuNumber: number) => {
  menu.setMenu(menuNumber);
  switch (menuNumber) {
    case SIDE_MENU.AUTHENTICATION:
      router.push(MENU_PATH.AUTH + AUTH_TAB_PATH.USERS);
      break;
    case SIDE_MENU.DATABASE:
      router.push({
        name: MENU_ROUTE_NAME.DATABASE,
        params: { title: $t('DashboardPage.SideMenu.Menu2') }
      });
      break;
    case SIDE_MENU.STORAGE:
      router.push({
        name: MENU_ROUTE_NAME.STORAGE,
        params: { title: $t('DashboardPage.SideMenu.Menu3') }
      });
      break;
    case SIDE_MENU.HOSTING:
      router.push({
        name: MENU_ROUTE_NAME.HOSTING,
        params: { title: $t('DashboardPage.SideMenu.Menu4') }
      });
      break;
    case SIDE_MENU.FUNCTIONS:
      router.push({
        name: MENU_ROUTE_NAME.FUNCTIONS,
        params: { title: $t('DashboardPage.SideMenu.Menu5') }
      });
      break;

    default:
      router.push(MENU_PATH.AUTH + AUTH_TAB_PATH.USERS);
      break;
  }
};
</script>
