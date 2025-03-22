<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const router = useRouter();
const { locale: currentLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const makeItem = (label: string, locale: Parameters<typeof switchLocalePath>[0]) => ({
  label,
  type: 'checkbox' as const,
  checked: currentLocale.value === locale,
  onSelect: () => router.push(switchLocalePath(locale)),
});

const items = computed<DropdownMenuItem[]>(() => [
  makeItem('English', 'en'),
  makeItem('简体中文', 'zh_cn'),
]);
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton icon="i-ion-language" color="neutral" variant="ghost" />
  </UDropdownMenu>
</template>
