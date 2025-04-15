export interface Notification {
  level: 'error' | 'info' | 'success' | 'warning';
  data: {
    type: 'message';
    title: string;
    description?: string;
  };
}

export function handleNotification(msg: Notification) {
  const { $toast } = useNuxtApp();
  const { level, data } = msg;
  $toast[level](data.title, {
    description: data.description,
  });
}
