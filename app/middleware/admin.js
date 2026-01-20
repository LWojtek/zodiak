export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) return;
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});
