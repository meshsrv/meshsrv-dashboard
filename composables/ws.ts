import { rand } from '@vueuse/core';

export type wsHandlers = {
  [K in keyof WebSocketEventMap]?: (this: WebSocket, event: WebSocketEventMap[K]) => void;
};

export function useWS(path: string, handlers?: wsHandlers) {
  const runtimeConfig = useRuntimeConfig();
  const auth = useAuthStore();
  const socket = ref<WebSocket | null>(null);
  const closing = ref(false);
  const reconnTimes = ref(0);
  (function connect() {
    const socket = new WebSocket(
      joinPath(runtimeConfig.public.wsBase, path),
      auth.sessionToken // smuggle token inside Sec-WebSocket-Protocol
    );
    if (handlers) {
      for (const [event, handler] of Object.entries(handlers)) {
        socket.addEventListener(event, handler as EventListener);
      }
    }
    socket.addEventListener('open', () => {
      reconnTimes.value = 0;
    });
    socket.addEventListener('close', () => {
      if (!closing.value) {
        reconnTimes.value++;
        // backoff until 10s
        setTimeout(connect, Math.min(rand(0, 3000) * reconnTimes.value, 10000));
      }
    });
    socket.addEventListener('error', () => {
      socket.close();
    });
  })();
  onUnmounted(() => {
    closing.value = true;
    socket.value?.close();
  });
  return socket;
}
