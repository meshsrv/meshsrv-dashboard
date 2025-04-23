export function useTopic(topic: string, onMessage: TopicHandler) {
  const ws = useWsStore();
  onMounted(() => {
    ws.socket.send(JSON.stringify({ type: 'subscribe', payload: topic }));
    ws.addTopicHandler(topic, onMessage);
  });
  onUnmounted(() => {
    ws.socket.send(JSON.stringify({ type: 'unsubscribe', payload: topic }));
    ws.removeTopicHandler(topic, onMessage);
  });
}
