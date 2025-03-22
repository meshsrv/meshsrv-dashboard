<script setup lang="ts">
const { meta } = useAppConfig();
</script>

<template>
  <UButton
    icon="i-tdesign-logo-github-filled"
    color="neutral"
    variant="ghost"
    target="_blank"
    :to="meta.repo"
  />
</template>
