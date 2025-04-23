// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TopicHandler = (payload: any, ws: WebSocket, event: MessageEvent) => void;

export const useWsStore = defineStore('ws', () => {
  const runtimeConfig = useRuntimeConfig();
  const auth = useAuthStore();

  const handlers = ref<Map<string, TopicHandler[]>>(new Map());

  const socket = useWebSocket(runtimeConfig.public.wsBase, {
    protocols: [auth.sessionToken], // smuggle token inside Sec-WebSocket-Protocol
    autoReconnect: {
      delay: 2000,
    },
    onMessage(ws, event) {
      const { topic, payload } = JSON.parse(event.data);
      if (handlers.value.has(topic)) {
        handlers.value.get(topic)?.forEach((handler) => handler(payload, ws, event));
      }
    },
  });

  const addTopicHandler = (topic: string, handler: TopicHandler) => {
    if (!handlers.value.has(topic)) {
      handlers.value.set(topic, []);
    }
    handlers.value.get(topic)?.push(handler);
  };

  const removeTopicHandler = (topic: string, handler: TopicHandler) => {
    if (handlers.value.has(topic)) {
      handlers.value.set(topic, handlers.value.get(topic)?.filter((h) => h !== handler) ?? []);
      if (handlers.value.get(topic)?.length === 0) handlers.value.delete(topic);
    }
  };

  return { socket, addTopicHandler, removeTopicHandler };
});
