<script setup lang="ts">
const items = useI18nDropdownMenuItems();
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton icon="i-ion-language" color="neutral" variant="ghost" />
  </UDropdownMenu>
</template>
