<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

withDefaults(
  defineProps<{
    collapsed?: boolean;
  }>(),
  {
    collapsed: false,
  }
);

const { t } = useI18n();
const auth = useAuthStore();
const colorMode = useColorMode();
const i18nMenu = useI18nDropdownMenuItems();

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: auth.user?.nickname
        ? `${auth.user.nickname} (${auth.user.username})`
        : auth.user?.username,
      icon: 'i-solar-user-id-bold',
      type: 'label',
    },
  ],
  [
    {
      label: t('userMenu.appearance'),
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: t('userMenu.light'),
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onSelect: (e) => {
            e.preventDefault();
            colorMode.preference = 'light';
          },
        },
        {
          label: t('userMenu.dark'),
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onSelect: (e) => {
            e.preventDefault();
            colorMode.preference = 'dark';
          },
        },
      ],
    },
    {
      label: t('userMenu.language'),
      icon: 'i-ion-language',
      children: i18nMenu.value,
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-tdesign-logo-github-filled',
      to: 'https://github.com/meshsrv',
      target: '_blank',
    },
    {
      label: t('userMenu.api'),
      icon: 'i-hugeicons-api',
      to: '/swagger',
      target: '_blank',
    },
  ],
  [
    {
      label: t('userMenu.logout'),
      icon: 'i-solar-logout-outline',
      onSelect: auth.logout,
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-(--ui-bg-elevated)"
      :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
      :ui="{ trailingIcon: 'text-(--ui-text-dimmed)' }"
      :label="collapsed ? undefined : (auth.user?.nickname ?? auth.user?.username)"
      icon="i-solar-user-id-bold"
    />
  </UDropdownMenu>
</template>
