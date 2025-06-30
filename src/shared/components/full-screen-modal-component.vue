<template>
  <div
    ref="target"
    class="h-[90%] w-full self-end overflow-auto rounded-t-2xl bg-white"
  >
    <button class="h-12 p-2 font-bold" @click="close">X close</button>
    <div class="h-[300px] w-full bg-yellow-300">
      sample text sample text sample text
    </div>
    <div class="h-[300px] w-full bg-yellow-500">
      sample text sample text sample text
    </div>
    <div class="h-[300px] w-full bg-yellow-400">
      sample text sample text sample text
    </div>
    <div class="h-[300px] w-full bg-yellow-600">
      sample text sample text sample text
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { onMounted, ref } from 'vue';
import { ModalUtil } from '../utils/modal.util';

const target = ref();
const { activate, deactivate } = useFocusTrap(target, { immediate: true });

onMounted(() => {
  activate();
});

const close = () => {
  deactivate();
  ModalUtil.pop();
};
</script>

<style lang="scss"></style>
