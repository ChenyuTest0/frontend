<template>
  <div class="flex w-full flex-col">
    <header class="sticky top-0 right-0 left-auto bg-purple-900 text-white">
      <div class="relative flex h-12 items-center justify-end px-6">
        <button
          class="mx-4 flex text-white hover:text-gray-200 focus:outline-hidden"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>

        <DropDownMenuComponent
          :button-img="imgUrl"
          :menus="menu"
        ></DropDownMenuComponent>
      </div>
    </header>

    <div class="flex shrink-0 flex-col bg-purple-900 text-white">
      <div class="flex h-12 items-center p-4">
        <span class="text-3xl tracking-wide">{{
          menuStore.currentPageTitle
        }}</span>
      </div>
    </div>
  </div>
  <LoadingMask :loading="loading" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMenuTabStore } from '../../../stores/menu-tab.store';
import imgUrl from '@/assets/img/img_avatar.png';
import { useAuthStore } from '@/business/stores/auth.store';
import { useShowDialogApiHandler } from '@/core/compositions/api-error-handler.composition';
import DropDownMenuComponent, {
  DropDownMenu
} from '@/shared/components/drop-down-menu.component.vue';

const auth = useAuthStore();
const router = useRouter();
const menuStore = useMenuTabStore();

const { handleApi, loading } = useShowDialogApiHandler<void>(() =>
  auth.logout()
);

const menu: DropDownMenu[] = [
  {
    name: 'Logout',
    handler: async () => {
      await handleApi();
      router.replace('/');
    }
  }
];
</script>
