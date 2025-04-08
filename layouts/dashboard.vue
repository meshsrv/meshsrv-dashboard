<script setup lang="ts">
import clsx from 'clsx';

const collapsed = ref(false);
const open = ref(false);
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden">
    <DashboardSidebar v-model:collapsed="collapsed" class="max-lg:hidden" />
    <UDrawer v-model:open="open" direction="left">
      <template #content>
        <DashboardSidebar
          :resizable="false"
          :ui="{ base: 'border-0 bg-transparent dark:bg-transparent' }"
        />
      </template>
    </UDrawer>

    <div class="relative flex flex-1 flex-col">
      <div
        :class="
          clsx(
            'flex h-12 shrink-0 items-center gap-2 px-4',
            'bg-neutral-100/25 dark:bg-neutral-800/25',
            'border-b border-neutral-200 dark:border-neutral-800'
          )
        "
      >
        <UButton
          variant="ghost"
          color="neutral"
          :icon="
            collapsed
              ? 'i-tabler-layout-sidebar-left-expand'
              : 'i-tabler-layout-sidebar-left-collapse'
          "
          class="max-lg:hidden"
          @click="collapsed = !collapsed"
        />
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-solar-hamburger-menu-outline"
          class="lg:hidden"
          @click="open = !open"
        />
        <p>测试</p>
      </div>

      <div class="flex-1 overflow-auto p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
