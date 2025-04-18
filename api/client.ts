import createClient from 'openapi-fetch';
import type { paths } from './schema';

export const api = createClient<paths>({ baseUrl: '/api' });

api.use({
  onRequest({ request }) {
    const sessionToken = useAuthStore().sessionToken;
    request.headers.set('Authorization', sessionToken);
    return request;
  },

  async onResponse({ response }) {
    // check http status code
    if (!response.ok) {
      if (response.status === 401) {
        useAuthStore().logout();
        return;
      }
      const msg = `${response.status} ${response.statusText}`;
      useNuxtApp().$toast.error(msg);
      return;
    }

    // check api response code
    const body = await response.clone().json();
    if (body.code != null && body.code !== 0) {
      const msg = body.msg ?? `Error ${body.code}`;
      useNuxtApp().$toast.error(msg);
    }
  },

  onError({ error }) {
    let msg = 'Unknown error';
    if (error instanceof Error) msg = error.message;
    else if (typeof error === 'string') msg = error;
    useNuxtApp().$toast.error(msg);
  },
});
