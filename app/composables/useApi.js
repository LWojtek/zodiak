export const useApi = () => {
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Accept-Language": "pl",
    },
  });
};

export const useFetchApi = (path, options = {}) => {
  return useFetch(path, {
    baseURL: config.public.apiBase,
    ...options,

    async onRequest(ctx) {
      ctx.options.headers = {
        ...(headers || {}),
        ...(ctx.options.headers || {}),
      };
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        // auth.clearUser();
        // navigateTo("/login");
      }
    },
  });
};
