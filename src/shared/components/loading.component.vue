<template>
  <div
    v-if="loading"
    v-anime="{ opacity: [0, 0.5] }"
    class="absolute inset-0 z-50 flex h-screen items-center justify-center bg-gray-500 opacity-0"
  >
    <div class="absolute top-1/2 left-1/2 -mt-10 -ml-10">
      <div
        v-if="!isTransparent"
        style="border-top-color: transparent"
        class="h-20 w-20 animate-spin rounded-full border-4 border-solid border-white"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ loading: boolean; isTransparent?: boolean }>(),
  {
    loading: false,
    isTransparent: false
  }
);
</script>
