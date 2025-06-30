<template src="./user-edit.html"></template>
<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref, onMounted } from 'vue';
import { useUserEditForm } from './user-edit.form.composition';
import '@vuepic/vue-datepicker/dist/main.css';
import type { UserDetailResponse } from '@/business/repositories/user.repository';
import { getCurrentLocale } from '@/shared/utils/i18n.util';
import { ModalUtil } from '@/shared/utils/modal.util';

const target = ref();
const { activate, deactivate } = useFocusTrap(target, { immediate: true });

onMounted(() => {
  activate();
});

const props = defineProps<{ user: UserDetailResponse }>();

const popEditModal = () => {
  deactivate();
  ModalUtil.pop();
};

const {
  loading,
  nameField,
  nameError,
  emailField,
  emailError,
  detailField,
  detailError,
  birthdayField,
  birthdayError,
  validPeriodField,
  validPeriodError,
  formMeta,
  onSummit
} = useUserEditForm(props.user, popEditModal);
const datepickerFormatter = (date: Date) => {
  if (!date) {
    return '';
  }
  const day = date.getDate();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
const rangeDatepickerFormatter = (dates: Array<Date>) => {
  const result: Array<string> = [];
  dates.forEach(date => {
    result.push(datepickerFormatter(date));
  });
  return result.join('〜');
};
const bdPickerStartFrom = ref('1990-01-01');
const locale = getCurrentLocale();
</script>
