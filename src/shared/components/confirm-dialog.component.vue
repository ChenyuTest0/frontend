<template>
  <div
    ref="target"
    classes="modal-container"
    content-class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-hidden focus:outline-hidden justify-center items-center flex"
  >
    <div class="relative mx-auto my-6 w-auto max-w-sm">
      <!--content-->
      <div
        class="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-hidden focus:outline-hidden"
      >
        <!--header-->
        <div
          class="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5"
        >
          <h3 class="text-3xl font-semibold">{{ $t(title) }}</h3>
          <span
            class="float-right ml-auto border-0 bg-transparent p-1 text-3xl leading-none font-semibold text-black opacity-5 outline-hidden focus:outline-hidden"
          >
            <span
              class="block h-6 w-6 bg-transparent text-3xl text-black opacity-5 outline-hidden focus:outline-hidden"
            >
              ×
            </span>
          </span>
        </div>
        <!--body-->
        <div class="relative flex-auto p-6">
          <p class="text-blueGray-500 my-4 text-lg leading-relaxed">
            <Nl2Br :text="$t(message)" />
          </p>
        </div>
        <!--footer-->
        <div
          class="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6"
        >
          <button
            class="background-transparent mr-1 mb-1 px-6 py-2 text-lg font-bold text-blue-700 uppercase outline-hidden transition-all duration-150 ease-linear focus:outline-hidden"
            type="button"
            @click="onClickOKButton"
          >
            {{ $t(okButtonTitle) }}
          </button>
          <button
            class="background-transparent mr-1 mb-1 px-6 py-2 text-lg font-bold text-blue-700 uppercase transition-all duration-150 ease-linear outline-none focus:outline-none"
            type="button"
            @click="popModal"
          >
            {{ $t('Button.CANCEL') }}
          </button>
        </div>
      </div>
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

const props = withDefaults(
  defineProps<{
    title: string;
    message: string;
    okButtonTitle?: string;
    okButtonActionHandler: () => void;
  }>(),
  { okButtonTitle: 'Button.OK' }
);

const onClickOKButton = () => {
  deactivate();
  props.okButtonActionHandler();
  ModalUtil.pop();
};

const popModal = () => {
  deactivate();
  ModalUtil.pop();
};
</script>
