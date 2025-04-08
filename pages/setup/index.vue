<script setup lang="ts">
import type { FormSubmitEvent, StepperItem } from '@nuxt/ui';
import clsx from 'clsx';
import { z } from 'zod';
import { api } from '~/api/client';

definePageMeta({
  layout: 'homepage',
  middleware: [
    async () => {
      const { data } = await api.GET('/is-uninitialized');
      if (!data) return navigateTo('/');
    },
  ],
});

const { t } = useI18n();
const items = computed<StepperItem[]>(() => [
  {
    title: t('setup.stepper[0].title'),
    description: t('setup.stepper[0].description'),
    icon: 'i-material-symbols-person-shield-rounded',
  },
  {
    title: t('setup.stepper[1].title'),
    description: t('setup.stepper[1].description'),
    icon: 'i-material-symbols-done-all-rounded',
  },
]);
const step = ref(0);

const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
});

const auth = useAuthStore();
const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data } = await api.POST('/sign-up', {
    body: event.data,
  });
  if (!data?.data?.token) return;
  auth.login(data.data.token);
  toast.add({
    title: t('setup.signup.toast.title'),
    description: t('setup.signup.toast.desc', { username: event.data.username }),
    color: 'success',
  });
  step.value++;
}
</script>

<template>
  <main class="mx-auto flex max-w-6xl flex-col items-center">
    <UStepper v-model="step" class="my-16 w-full" disabled :items="items" />

    <Transition name="slide-left" mode="out-in">
      <MyCard v-if="step === 0" cls="w-full max-w-sm gap-2 rounded-3xl bg-bg/50 p-8 shadow">
        <UIcon name="i-material-symbols-person-shield-rounded" class="w-full text-4xl" />
        <h1 class="text-center text-lg">{{ $t('setup.signup.title') }}</h1>

        <UForm
          :state="state"
          :schema="schema"
          :validate-on="[]"
          class="space-y-3"
          @submit="onSubmit"
        >
          <UFormField :label="$t('setup.signup.username')" name="username">
            <UInput
              v-model="state.username"
              class="w-full"
              :placeholder="$t('setup.signup.usernamePlaceholder')"
              autofocus
            />
          </UFormField>

          <UFormField :label="$t('setup.signup.password')" name="password">
            <UInput
              v-model="state.password"
              class="w-full"
              type="password"
              :placeholder="$t('setup.signup.passwordPlaceholder')"
            />
          </UFormField>

          <UButton type="submit" class="mt-3" block loading-auto>
            {{ $t('setup.signup.continue') }}
          </UButton>
        </UForm>
      </MyCard>

      <div v-else-if="step === 1" class="flex-center flex-col gap-2">
        <UIcon name="i-mingcute-certificate-fill" class="mb-4 text-7xl text-green-600" />

        <h2 class="text-2xl font-bold text-green-700 dark:text-green-500">
          {{ $t('setup.done.title') }}
        </h2>
        <span class="text-fg/60">{{ $t('setup.done.desc') }}</span>

        <NuxtLink
          :class="
            clsx(
              'mt-8 flex-center gap-3 transition-all',
              'rounded-3xl px-10 py-2',
              'text-lg',
              'bg-gray-500/20 hover:brightness-125 active:brightness-90',
              'hover:-translate-y-0.5'
            )
          "
          to="/app"
        >
          {{ $t('setup.goToApp') }}
        </NuxtLink>
      </div>
    </Transition>
  </main>
</template>
