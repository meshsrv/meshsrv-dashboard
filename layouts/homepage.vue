<script setup lang="ts">
import clsx from 'clsx';

const { meta } = useAppConfig();
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <div
      :class="
        clsx(
          'flex-center h-screen w-screen flex-col gap-3',
          'animate-appear bg-gradient-to-t from-primary-500/30 dark:from-primary-500/60'
        )
      "
    >
      <header :class="clsx('z-50 w-full max-w-6xl px-4 py-4', 'flex items-center justify-between')">
        <div class="text-2xl font-bold">{{ meta.name }}</div>
        <div class="flex-center gap-2">
          <HeaderLanguageButton />
          <HeaderColorModeButton />
          <HeaderGitHubButton />
        </div>
      </header>

      <div class="size-full grow">
        <slot />
      </div>

      <footer class="flex-center py-3 text-sm">
        <div>
          {{ `${meta.name} v${meta.version} - by ` }}
          <ULink
            class="font-bold text-fg hover:text-primary-300"
            target="_blank"
            :to="meta.authorUrl"
          >
            {{ meta.author }}
          </ULink>
          <span>{{ ' ' + meta.year }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>
