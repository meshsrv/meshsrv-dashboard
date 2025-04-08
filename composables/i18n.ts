import type { DropdownMenuItem } from '@nuxt/ui';

export function useI18nDropdownMenuItems(): ComputedRef<DropdownMenuItem[]> {
  const { locale: currentLocale, setLocale } = useI18n();
  const makeItem = (label: string, locale: Parameters<typeof setLocale>[0]) => ({
    label,
    icon: 'i-clarity-language-line',
    type: 'checkbox' as const,
    checked: currentLocale.value === locale,
    onSelect: (e: Event) => {
      e.preventDefault();
      setLocale(locale);
    },
  });
  return computed(() => [makeItem('English', 'en'), makeItem('简体中文', 'zh_cn')]);
}
