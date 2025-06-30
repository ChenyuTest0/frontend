<template>
  <TabComponent></TabComponent>
  <router-view />
</template>
<script setup lang="ts">
import { useMenuTabStore } from '../../../stores/menu-tab.store';
import { useUserStore } from '../../../stores/user.store';
import TabComponent from '../tab/tab.vue';

const user = useUserStore();
const tab = useMenuTabStore();
</script>
