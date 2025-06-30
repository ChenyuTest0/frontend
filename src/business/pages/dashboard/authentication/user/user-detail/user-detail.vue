<template src="./user-detail.html"></template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import userEditComponent from '../user-edit/user-edit.vue';
import { useUserStore } from '@/business/stores/user.store';
import { ModalUtil } from '@/shared/utils/modal.util';
import { useShowDialogApiHandler } from '@core/compositions/api-error-handler.composition';
import confirmDialog from '@shared/components/confirm-dialog.component.vue';

const props = defineProps<{ userId: number }>();
const user = useUserStore();

const { handleApi: handleDetailApi, loading: detailLoading } =
  useShowDialogApiHandler<void>(() => user.loadUserDetail(props.userId));

const { handleApi: handleDeleteApi, loading: deleteLoading } =
  useShowDialogApiHandler<void>(async () => {
    await user.deleteUser(props.userId);
    await user.loadUserList();
  });

const onClickEdit = () => {
  ModalUtil.push(userEditComponent, { user: user.userDetail });
};
const onClickDelete = () => {
  ModalUtil.push(confirmDialog, {
    title: 'UserDeleteConfirmDialog.Title',
    message: 'UserDeleteConfirmDialog.Message',
    okButtonActionHandler: async () => {
      await handleDeleteApi();
      ModalUtil.pop();
    }
  });
};

const popModal = () => ModalUtil.pop();

onBeforeMount(async () => {
  await handleDetailApi();
});
</script>
