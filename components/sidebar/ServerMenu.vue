<script setup lang="ts">
import clsx from 'clsx';

withDefaults(
  defineProps<{
    collapsed?: boolean;
  }>(),
  {
    collapsed: false,
  }
);

// TODO
const items = ref(['localhost', '192.168.1.100', 'Aliyun', 'Tencent Cloud', 'AWS']);
const value = ref('localhost');
const icon = ref('i-emojione-flag-for-china');
</script>

<template>
  <USelectMenu
    v-model="value"
    :items="items"
    variant="ghost"
    :icon="collapsed ? '' : icon"
    :trailing-icon="collapsed ? '' : 'i-lucide-chevrons-up-down'"
    :ui="{
      base: clsx({
        'w-full h-10': !collapsed,
        'size-8 p-0': collapsed,
      }),
      value: clsx({
        hidden: collapsed,
      }),
      content: clsx({
        'w-40': collapsed,
      }),
    }"
  >
    <template v-if="collapsed" #default>
      <UIcon class="m-auto size-5" :name="icon" />
    </template>
  </USelectMenu>
</template>
