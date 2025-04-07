<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

withDefaults(
  defineProps<{
    cls?: string;
  }>(),
  {
    cls: '',
  }
);
</script>

<template>
  <div
    :class="
      twMerge(
        'relative flex flex-col p-6',
        'rounded-[calc(var(--ui-radius)*2)] bg-bg',
        'ring ring-(--ui-border)',
        cls
      )
    "
  >
    <slot />
  </div>
</template>
