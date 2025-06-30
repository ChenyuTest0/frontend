<template src="./login.html"></template>

<script setup lang="ts">
import anime from 'animejs';
import { onMounted } from 'vue';
import { useLoginForm } from './login.form.composition';

const {
  loading,
  passwordField,
  passwordError,
  mailAddressField,
  mailAddressError,
  formMeta,
  onSubmit
} = useLoginForm();

onMounted(() => {
  anime({
    targets: '.fade-animation',
    opacity: [0, 1],
    easing: 'easeInOutQuad'
  });
});
</script>

// Scope定義を行うことで、CSSをコンポーネントに閉じ込める
<style lang="scss" scoped>
@import './login';
</style>
