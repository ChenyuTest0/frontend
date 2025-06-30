<template src="./user-list.html"></template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';

import userDetailComponent from '../user-detail/user-detail.vue';
import userEditComponent from '../user-edit/user-edit.vue';
import { useUserStore } from '@/business/stores/user.store';
import fullScreenModalComponent from '@/shared/components/full-screen-modal-component.vue';
import { ModalTransitionType, ModalUtil } from '@/shared/utils/modal.util';
import { useShowDialogApiHandler } from '@core/compositions/api-error-handler.composition';

const user = useUserStore();

const { handleApi, error, loading } = useShowDialogApiHandler<void>(() =>
  user.loadUserList()
);

const loadUserList = async () => {
  await handleApi();
};

const onClickUser = async (userId: number) => {
  ModalUtil.push(userDetailComponent, { userId: userId });
};

const onClickAddBtn = () => {
  ModalUtil.push(userEditComponent);
};

const openSampleModal = () => {
  ModalUtil.push(
    fullScreenModalComponent,
    {},
    {
      transitionType: ModalTransitionType.SLIDE_UP
    }
  );
};

onBeforeMount(() => {
  loadUserList();
});
</script>
