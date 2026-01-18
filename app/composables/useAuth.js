export const useAuth = () => {
  const USER_KEY = "auth:user";

  const user = useState("user", () => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const api = useApi();

  const restoreUser = () => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) {
        user.value = JSON.parse(stored);
        return user.value;
      }
    } catch {
      localStorage.removeItem(USER_KEY);
    }

    return null;
  };

  const fetchUser = async () => {
    try {
      const data = await api("/api/auth/me");
      user.value = data;
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return data;
    } catch {
      return null;
    }
  };

  const clearUser = () => {
    user.value = null;
    localStorage.removeItem("auth:user");
  };

  const logout = async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } finally {
      user.value = null;

      localStorage.removeItem(USER_KEY);

      await navigateTo("/login");
    }
  };

  const isLoggedIn = computed(() => restoreUser());

  return {
    user,
    isLoggedIn,
    fetchUser,
    logout,
    clearUser,
    restoreUser,
  };
};
