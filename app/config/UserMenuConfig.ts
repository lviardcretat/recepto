import type { DropdownMenuItem } from '@nuxt/ui';
import type { Composer } from 'vue-i18n';

interface UserMenuConfigProps {
  isAnonymous: boolean;
  redirectToLoginPage: () => void;
  signout: () => void;
};

export function createUserMenuConfig(
  t: Composer['t'],
  props: UserMenuConfigProps,
): ComputedRef<DropdownMenuItem[][]> {
  return computed(() => [
    [
      {
        label: t('mainSlideOver.settings'),
        icon: 'i-lucide-settings',
        disabled: true,
      },
      {
        label: t('mainSlideOver.dashboard'),
        icon: 'i-lucide-layout-dashboard',
        to: '/user/dashboard',
      },
    ],
    [
      {
        label: t('mainSlideOver.github'),
        icon: 'i-lucide-github',
        to: 'https://github.com/lviardcretat/recepto',
        target: '_blank',
      },
      {
        label: t('mainSlideOver.discord'),
        icon: 'ic:baseline-discord',
        to: 'https://discord.gg/vF7FbDpDwt',
        target: '_blank',
      },
    ],
    [
      props.isAnonymous
        ? {
            label: t('auth.login.title'),
            icon: 'i-lucide-log-in',
            onSelect: (_event: Event) => props.redirectToLoginPage(),
          }
        : {
            label: t('mainSlideOver.logout'),
            icon: 'i-lucide-log-out',
            onSelect: (_event: Event) => props.signout(),
          },
    ],
  ] satisfies DropdownMenuItem[][],
  );
}
