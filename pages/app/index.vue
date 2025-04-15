<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
});

useWS('/notification', {
  message(event) {
    const msg = JSON.parse(event.data);
    handleNotification(msg);
  },
});
</script>

<template>
  <main />
</template>
