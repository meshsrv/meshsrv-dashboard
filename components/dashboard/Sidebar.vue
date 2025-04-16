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
    label: t('nav.servers'),
    icon: 'i-solar-server-2-bold',
    to: '/app',
  },
  {
    label: t('nav.notifications'),
    icon: 'i-solar-bell-bold',
    to: '/app/notifications',
  },
  {
    label: t('nav.plugins'),
    icon: 'i-material-symbols-extension-rounded',
    to: '/app/plugins',
  },
  {
    label: t('nav.label_tools'),
    type: 'label',
  },
  {
    label: t('nav.files'),
    icon: 'i-solar-folder-with-files-bold',
    to: '/app/files',
  },
  {
    label: t('nav.ssh'),
    icon: 'i-solar-programming-bold',
    to: '/app/ssh',
  },
  {
    label: t('nav.label_dev'),
    type: 'label',
  },
  {
    label: t('nav.logs'),
    icon: 'i-solar-document-text-bold',
    to: '/app/logs',
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
