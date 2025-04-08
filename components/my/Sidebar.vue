<script setup lang="ts">
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SidebarProps {
  resizable?: boolean;
  minSize?: number;
  defaultSize?: number;
  maxSize?: number;
  collapsedSize?: number;
  ui?: {
    base?: string;
    header?: string;
    content?: string;
    footer?: string;
    separator?: string;
  };
}

const props = withDefaults(defineProps<SidebarProps>(), {
  resizable: true,
  minSize: 10,
  defaultSize: 15,
  maxSize: 20,
  collapsedSize: 4,
  ui: () => ({}),
});
const collapsed = defineModel<boolean>('collapsed', { default: false });
watch(collapsed, (v) => {
  if (v) {
    widthBeforeCollapse.value = width.value;
    width.value = props.collapsedSize;
  } else {
    width.value = widthBeforeCollapse.value;
  }
});
const collapse = (v: boolean) => (collapsed.value = v);

const isResizing = ref(false);
const startWidth = ref(0);
const startX = ref(0);
const endX = ref(0);

// width in rem
const widthBeforeCollapse = ref(0);
const width = ref(collapsed.value ? props.collapsedSize : props.defaultSize);

const startResize = (e: MouseEvent) => {
  startWidth.value = width.value;
  startX.value = e.clientX;
  endX.value = e.clientX;
  isResizing.value = true;
  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
};
const onResize = (e: MouseEvent) => {
  if (!isResizing.value) return;
  endX.value = e.clientX;
  const diff = (endX.value - startX.value) / 16;
  const newWidth = startWidth.value + diff;
  if (newWidth <= props.collapsedSize) {
    collapse(true);
    return;
  }
  collapse(false);
  if (newWidth < props.minSize) width.value = props.minSize;
  else if (newWidth > props.maxSize) width.value = props.maxSize;
  else width.value = newWidth;
};
function stopResize() {
  isResizing.value = false;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}
onUnmounted(stopResize);
</script>

<template>
  <aside
    :class="
      clsx(
        twMerge(
          'relative flex',
          'shrink-0 flex-col',
          'bg-neutral-100/25 dark:bg-neutral-800/25',
          'border-r border-neutral-200 dark:border-neutral-800',
          'min-h-svh w-(--width)',
          ui.base
        ),
        { 'pointer-events-none': isResizing }
      )
    "
    :style="{ '--width': `${width}rem`, minWidth: `${collapsedSize}rem` }"
  >
    <div
      v-if="$slots.header"
      :class="twMerge('flex shrink-0 items-center gap-1.5 px-4 py-2', ui.header)"
    >
      <slot name="header" :collapsed="collapsed" :collapse="collapse" />
    </div>

    <div :class="twMerge('flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-2', ui.content)">
      <slot name="default" :collapsed="collapsed" :collapse="collapse" />
    </div>

    <div
      v-if="$slots.footer"
      :class="twMerge('flex shrink-0 items-center gap-1.5 px-4 py-2', ui.footer)"
    >
      <slot name="footer" :collapsed="collapsed" :collapse="collapse" />
    </div>

    <div
      v-if="resizable"
      role="separator"
      :class="
        twMerge(
          '!pointer-events-auto',
          'absolute -right-1 h-full w-2',
          'cursor-ew-resize touch-none select-none',
          ui.separator
        )
      "
      @mousedown="startResize"
    />
  </aside>
</template>
