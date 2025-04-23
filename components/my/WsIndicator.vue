<script setup lang="ts">
import clsx from 'clsx';

const ws = useWsStore();
const { t } = useI18n();
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      :class="
        clsx('size-2 rounded-full', {
          'bg-green-500': ws.socket.status === 'OPEN',
          'bg-red-500': ws.socket.status === 'CLOSED',
          'bg-yellow-500': ws.socket.status === 'CONNECTING',
        })
      "
    />
    <span class="text-sm">
      {{ t('ws.status.' + ws.socket.status) }}
    </span>
  </div>
</template>

<style scoped></style>
