<script setup lang="ts">
import clsx from 'clsx';

definePageMeta({
  layout: 'homepage',
  middleware: ['home-redirect', 'transition-slide'],
});
</script>

<template>
  <main class="flex-center size-full flex-col">
    <div class="mb-16 text-4xl md:text-5xl/tight lg:text-6xl/tight">
      <h2 class="whitespace-pre">{{ $t('home.slogan') }}</h2>
    </div>

    <NuxtLink
      :class="
        clsx(
          'flex-center gap-3 transition-all',
          'rounded-3xl px-10 py-2',
          'text-lg font-bold',
          'bg-gray-500/20 hover:brightness-125 active:brightness-90'
        )
      "
      to="/login"
    >
      {{ $t('home.login') }}
      <UIcon name="i-fa6-solid-arrow-right" />
    </NuxtLink>
  </main>
</template>
