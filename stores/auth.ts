import { api } from '~/api/client';
import type { paths } from '~/api/schema';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const sessionToken = ref('');
    type User =
      paths['/user-info']['get']['responses']['200']['content']['application/json']['data'];
    const user = ref<User>();

    async function login(token: string) {
      sessionToken.value = token;
      const { data } = await api.GET('/user-info');
      user.value = data?.data;
    }

    function logout() {
      sessionToken.value = '';
      window.location.href = '/';
    }

    return {
      sessionToken,
      user,
      login,
      logout,
    };
  },
  { persist: true }
);
