<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { twMerge } from 'tailwind-merge';
import type { SidebarProps } from '../my/Sidebar.vue';

const props = withDefaults(defineProps<SidebarProps>(), {});
const sidebarCollapsed = defineModel<boolean>('collapsed', { default: false });

const { t } = useI18n();
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('nav.label_overview'),
    type: 'label',
  },
  {
    label: t('nav.serverList'),
    icon: 'i-solar-server-2-bold',
    to: '/app',
  },
]);
</script>

<template>
  <MySidebar
    v-model:collapsed="sidebarCollapsed"
    v-bind="{
      ...props,
      ui: {
        ...props.ui,
        header: twMerge('mt-2', props.ui?.header),
      },
    }"
  >
    <template #header="{ collapsed }">
      <SidebarServerMenu :collapsed="collapsed" />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu :collapsed="collapsed" orientation="vertical" :items="items" />
    </template>

    <template #footer="{ collapsed }">
      <SidebarUserMenu :collapsed="collapsed" />
    </template>
  </MySidebar>
</template>
