<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui';

const toaster: ToasterProps = {
  position: 'top-center',
  expand: false,
  duration: 3000,
};
</script>

<template>
  <UApp :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
