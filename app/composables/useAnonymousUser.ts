import { authClient } from '~/utils/auth-client';

/**
 * Composable pour gérer l'état et les restrictions des utilisateurs anonymes
 */
export const useAnonymousUser = () => {
  /**
   * Vérifie si l'utilisateur actuel est anonyme
   * Cette fonction doit être utilisée dans un contexte async
   */
  const checkIsAnonymous = async () => {
    const { data: session } = await authClient.useSession(useFetch);
    // Better Auth ajoute la propriété isAnonymous pour les utilisateurs anonymes
    return (session.value?.user as { isAnonymous?: boolean })?.isAnonymous === true;
  };

  /**
   * Vérifie si l'utilisateur est connecté (anonyme ou authentifié)
   */
  const checkIsLoggedIn = async () => {
    const { data: session } = await authClient.useSession(useFetch);
    return !!session.value?.user;
  };

  /**
   * Vérifie si l'utilisateur peut créer du contenu
   * (seuls les utilisateurs authentifiés peuvent créer)
   */
  const canCreate = async () => {
    const isLoggedIn = await checkIsLoggedIn();
    const isAnonymous = await checkIsAnonymous();
    return isLoggedIn && !isAnonymous;
  };

  /**
   * Vérifie si l'utilisateur peut accéder à son profil
   */
  const canAccessProfile = async () => {
    const isLoggedIn = await checkIsLoggedIn();
    const isAnonymous = await checkIsAnonymous();
    return isLoggedIn && !isAnonymous;
  };

  /**
   * Vérifie si l'utilisateur peut modifier du contenu
   */
  const canEdit = async () => {
    const isLoggedIn = await checkIsLoggedIn();
    const isAnonymous = await checkIsAnonymous();
    return isLoggedIn && !isAnonymous;
  };

  /**
   * Redirige vers la page de connexion avec un message d'authentification requise
   */
  const requireAuth = async (message = 'auth_required') => {
    await navigateTo(`/login?message=${message}`);
  };

  /**
   * Affiche un toast d'information pour les utilisateurs anonymes
   */
  const showAnonymousLimitation = (action: string) => {
    const toast = useToast();
    const { t } = useI18n();

    toast.add({
      title: t('auth.anonymous.limitationTitle'),
      description: t('auth.anonymous.limitationDescription', { action }),
      color: 'warning',
      actions: [{
        label: t('auth.login.button'),
        onClick: () => requireAuth('feature_access'),
      }],
    });
  };

  return {
    checkIsAnonymous,
    checkIsLoggedIn,
    canCreate,
    canAccessProfile,
    canEdit,
    requireAuth,
    showAnonymousLimitation,
  };
};
