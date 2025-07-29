import { authClient } from '~/utils/auth-client';

export const useAnonymousRestrictions = () => {
  const { data: session } = authClient.useSession(useFetch);

  const isAnonymous = computed(() => {
    return session.value?.user.role === 'anonymous';
  });

  const canCreate = computed(() => {
    return !isAnonymous.value;
  });

  const canAccessUserPages = computed(() => {
    return !isAnonymous.value;
  });

  const showCreateButton = (entityType: 'recipe' | 'ingredient' | 'utensil' | 'category') => {
    return canCreate.value;
  };

  const showUserSection = () => {
    return canAccessUserPages.value;
  };

  return {
    isAnonymous: readonly(isAnonymous),
    canCreate: readonly(canCreate),
    canAccessUserPages: readonly(canAccessUserPages),
    showCreateButton,
    showUserSection,
  };
};