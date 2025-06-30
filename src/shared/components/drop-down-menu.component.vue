<template>
  <div class="relative block h-8 w-8">
    <button
      class="relative z-10 block overflow-hidden rounded-full shadow focus:outline-none"
      @click="onClickBtn"
    >
      <img class="h-full w-full object-cover" :src="buttonImg" alt="Avatar" />
    </button>

    <div
      v-show="dropdownOpen"
      class="fixed inset-0 z-1000 h-full w-full"
      @click="onClickSubMenu"
    ></div>

    <div
      v-show="dropdownOpen"
      class="absolute right-0 z-1020 mt-2 w-48 rounded-md bg-white py-2 shadow-xl"
    >
      <a
        v-for="(menu, index) in menus"
        :key="index"
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 capitalize hover:bg-blue-500 hover:text-white"
        @click="menu.handler"
      >
        {{ menu.name }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface DropDownMenu {
  name: string;
  handler: () => void;
}

const props = defineProps<{ buttonImg: string; menus: DropDownMenu[] }>();

import { ref } from 'vue';

const dropdownOpen = ref(false);

const onClickSubMenu = () => {
  dropdownOpen.value = false;
};

const onClickBtn = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>
