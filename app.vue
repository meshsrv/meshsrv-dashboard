<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui';
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);
useHead({
  htmlAttrs: { lang, dir },
});

const toaster: ToasterProps = {
  position: 'top-center',
  expand: false,
  duration: 3000,
};
</script>

<template>
  <UApp :locale="locales[locale]" :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
