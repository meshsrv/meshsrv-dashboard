import { api } from '~/api/client';

export default defineNuxtRouteMiddleware(async () => {
  const { data } = await api.GET('/is-uninitialized');
  if (data) {
    return navigateTo('/setup');
  }

  if (useAuthStore().sessionToken) {
    return navigateTo('/app');
  }
});
