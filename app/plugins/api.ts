export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: '/api',

    async onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });

  return {
    provide: {
      api,
    },
  };
});
