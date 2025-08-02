export default defineEventHandler(async (event) => {
  await setUserSession(event, {
    user: {
      id: `guest_${Date.now()}`,
      username: 'Invité',
      isAnonymous: true,
    },
  });

  return { success: true };
});
