<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';
import { api } from '~/api/client';

definePageMeta({
  layout: 'homepage',
  middleware: ['transition-slide'],
});

const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
});

const { $toast } = useNuxtApp();
const { t } = useI18n();
const auth = useAuthStore();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data } = await api.POST('/sign-in', {
    body: event.data,
  });
  if (!data?.data?.token) return;
  auth.login(data.data.token);
  $toast.success(t('login.toast', { username: event.data.username }));
  router.push('/app');
}
</script>

<template>
  <main class="flex-center size-full flex-col">
    <MyCard cls="w-full max-w-sm gap-2 rounded-3xl bg-bg/50 p-8 shadow">
      <UButton
        class="absolute top-4 left-4 z-10"
        icon="i-material-symbols-arrow-back-rounded"
        variant="ghost"
        color="neutral"
        to="/"
      />

      <UIcon name="i-material-symbols-frame-person-rounded" class="w-full text-4xl" />
      <h1 class="text-center text-lg">{{ $t('login.title') }}</h1>

      <UForm :state="state" :schema="schema" :validate-on="[]" class="space-y-3" @submit="onSubmit">
        <UFormField :label="$t('login.username')" name="username">
          <UInput
            v-model="state.username"
            class="w-full"
            :placeholder="$t('login.usernamePlaceholder')"
            autofocus
          />
        </UFormField>

        <UFormField :label="$t('login.password')" name="password">
          <UInput
            v-model="state.password"
            class="w-full"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
          />
        </UFormField>

        <UButton type="submit" class="mt-3" block loading-auto>{{ $t('login.continue') }}</UButton>
      </UForm>
    </MyCard>
  </main>
</template>
