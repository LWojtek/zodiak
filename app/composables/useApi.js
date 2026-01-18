const useApiBase = () => {
  const config = useRuntimeConfig();

  let headers = {
    Accept: "application/json",
    "Accept-Language": "pl",
  };

  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }

  return { config, headers };
};

export const useApi = () => {
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",

    headers: {
      Accept: "application/json",
      "Accept-Language": "pl",
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        auth.clearUser();
        navigateTo("/login");
      }
    },
  });
};

export const useFetchApi = (path, options = {}) => {
  const { config, headers } = useApiBase();

  return useFetch(path, {
    baseURL: config.public.apiUrl,
    ...options,

    async onRequest(ctx) {
      ctx.options.headers = {
        ...(headers || {}),
        ...(ctx.options.headers || {}),
      };
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        auth.clearUser();
        navigateTo("/login");
      }
    },
  });
};
