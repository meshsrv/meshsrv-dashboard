<script setup lang="ts">
import clsx from 'clsx';

definePageMeta({ layout: 'homepage' });
</script>

<template>
  <main class="flex-center size-full flex-col">
    <div class="mb-16 text-4xl md:text-5xl/tight lg:text-6xl/tight">
      <h2 class="whitespace-pre">{{ $t('home.slogan') }}</h2>
    </div>

    <button
      :class="
        clsx(
          'flex-center gap-3 transition-all',
          'rounded-3xl px-10 py-2',
          'text-lg font-bold',
          'bg-gray-500/20 hover:brightness-125 active:brightness-90'
        )
      "
    >
      {{ $t('home.login') }}
      <UIcon name="i-fa6-solid-arrow-right" />
    </button>
  </main>
</template>
