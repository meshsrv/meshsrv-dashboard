export const useAuthStore = defineStore(
  'auth',
  () => {
    const sessionToken = ref('');

    function logout() {
      sessionToken.value = '';
      window.location.href = '/login';
    }

    return {
      sessionToken,
      logout,
    };
  },
  { persist: true }
);
